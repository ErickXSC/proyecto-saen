<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use App\Models\Prestamo;
use App\Models\Alumno;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class InventarioController extends Controller
{
    public function index()
    {
        $inventario = Inventario::orderBy('nombre_articulo')->get();
        
        $prestamos = Prestamo::with(['inventario', 'alumno'])
            ->whereNull('fecha_devolucion')
            ->orderBy('fecha_prestamo', 'desc')
            ->get()
            ->map(function ($prestamo) {
                return [
                    'id_prestamo' => $prestamo->id_prestamo,
                    'articulo' => $prestamo->inventario ? $prestamo->inventario->nombre_articulo : 'Desconocido',
                    'alumno' => $prestamo->alumno ? $prestamo->alumno->nombre_completo : 'Desconocido',
                    'cantidad' => $prestamo->cantidad,
                    'fecha_prestamo' => $prestamo->fecha_prestamo,
                ];
            });

        $alumnos = Alumno::where('estado', 'Activo')->select('id_alumno', 'nombre_completo')->get();

        return Inertia::render('Inventario/Index', [
            'inventario' => $inventario,
            'prestamos' => $prestamos,
            'alumnos' => $alumnos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_articulo' => 'required|string|max:100',
            'cantidad_total' => 'required|integer|min:1',
            'stock_minimo' => 'required|integer|min:0',
            'estado' => 'required|in:Bueno,Regular,Malo'
        ]);

        Inventario::create($validated);

        return redirect()->back()->with('success', 'Artículo agregado al inventario.');
    }

    public function prestar(Request $request, Inventario $inventario)
    {
        $validated = $request->validate([
            'id_alumno' => 'required|exists:alumnos,id_alumno',
            'cantidad' => 'required|integer|min:1'
        ]);

        if ($validated['cantidad'] > $inventario->cantidad_total) {
            throw ValidationException::withMessages([
                'cantidad' => 'No hay suficiente stock disponible.'
            ]);
        }

        // Crear el préstamo
        Prestamo::create([
            'id_inventario' => $inventario->id_inventario,
            'id_alumno' => $validated['id_alumno'],
            'cantidad' => $validated['cantidad'],
            'fecha_prestamo' => now(),
        ]);

        // Restar del stock
        $inventario->decrement('cantidad_total', $validated['cantidad']);

        return redirect()->back()->with('success', 'Préstamo registrado y stock actualizado.');
    }

    public function devolver(Prestamo $prestamo)
    {
        // Marcar como devuelto
        $prestamo->update(['fecha_devolucion' => now()]);

        // Sumar al stock
        $prestamo->inventario->increment('cantidad_total', $prestamo->cantidad);

        return redirect()->back()->with('success', 'Artículo devuelto y stock actualizado.');
    }
}