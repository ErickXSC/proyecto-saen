<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AlumnoController extends Controller
{
    public function index()
    {
        $alumnos = Alumno::with('cliente')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($alumno) {
                return [
                    'id_alumno' => $alumno->id_alumno,
                    'nombre_completo' => $alumno->nombre_completo,
                    'email' => $alumno->cliente ? $alumno->cliente->email : 'Sin correo',
                    'nivel' => $alumno->nivel ?? 'Sin nivel',
                    'categoria' => $alumno->categoria ?? 'Sin categoría',
                    'estado' => $alumno->estado,
                    'codigo_qr' => $alumno->codigo_qr,
                ];
            });

        return Inertia::render('Alumnos/Index', [
            'alumnos' => $alumnos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:150',
            'fecha_nacimiento' => 'required|date',
            'categoria' => 'nullable|string|max:50',
            'nivel' => 'nullable|string|max:50',
            'tutor_nombre' => 'required|string|max:150',
            'tutor_telefono' => 'required|string|max:15',
            'tutor_email' => 'nullable|email|max:150',
        ]);

        $cliente = Cliente::create([
            'nombre_completo' => $validated['tutor_nombre'],
            'telefono' => $validated['tutor_telefono'],
            'email' => $validated['tutor_email'] ?? null,
        ]);

        Alumno::create([
            'id_cliente' => $cliente->id_cliente,
            'nombre_completo' => $validated['nombre_completo'],
            'fecha_nacimiento' => $validated['fecha_nacimiento'],
            'categoria' => $validated['categoria'] ?? null,
            'nivel' => $validated['nivel'] ?? null,
            'codigo_qr' => (string) Str::uuid(),
            'estado' => 'Activo',
        ]);

        return redirect()->back()->with('success', 'Alumno registrado correctamente.');
    }

    public function update(Request $request, Alumno $alumno)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:150',
            'fecha_nacimiento' => 'required|date',
            'categoria' => 'nullable|string|max:50',
            'nivel' => 'nullable|string|max:50',
            'estado' => 'required|in:Activo,Inactivo,Congelado,Egresado',
        ]);

        $alumno->update($validated);

        if ($alumno->cliente && $request->has('tutor_telefono')) {
            $alumno->cliente->update([
                'telefono' => $request->tutor_telefono,
                'email' => $request->tutor_email,
            ]);
        }

        return redirect()->back()->with('success', 'Alumno actualizado correctamente.');
    }

    public function destroy(Alumno $alumno)
    {
        $alumno->update(['estado' => 'Inactivo']);
        return redirect()->back()->with('success', 'Alumno dado de baja (Inactivo).');
    }
}