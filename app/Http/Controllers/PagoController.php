<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use App\Models\Alumno;
use App\Models\ConceptoPago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::with(['alumno', 'concepto'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pago) {
                return [
                    'id_pago' => $pago->id_pago,
                    'alumno' => $pago->alumno ? $pago->alumno->nombre_completo : 'Desconocido',
                    'concepto' => $pago->concepto ? $pago->concepto->nombre_concepto : 'General',
                    'monto_final' => $pago->monto_final,
                    'fecha_pago' => $pago->fecha_pago,
                    'estado' => $pago->estado,
                ];
            });

        $alumnos = Alumno::where('estado', 'Activo')->select('id_alumno', 'nombre_completo')->get();
        
        $conceptos = ConceptoPago::all();
        
        if ($conceptos->isEmpty()) {
            ConceptoPago::create(['nombre_concepto' => 'Mensualidad']);
            ConceptoPago::create(['nombre_concepto' => 'Inscripción']);
            ConceptoPago::create(['nombre_concepto' => 'Anualidad']);
            $conceptos = ConceptoPago::all();
        }

        $totalRecaudado = Pago::whereMonth('fecha_pago', now()->month)
                              ->whereYear('fecha_pago', now()->year)
                              ->where('estado', 'Pagado')
                              ->sum('monto_final');

        $adeudosActivos = Pago::where('estado', 'Pendiente')->count();
        $alumnosCorriente = Alumno::where('estado', 'Activo')->count() - $adeudosActivos;
        if ($alumnosCorriente < 0) $alumnosCorriente = 0;

        return Inertia::render('Pagos/Index', [
            'pagos' => $pagos,
            'alumnos' => $alumnos,
            'conceptos' => $conceptos,
            'stats' => [
                'total_recaudado' => $totalRecaudado,
                'alumnos_corriente' => $alumnosCorriente,
                'adeudos_activos' => $adeudosActivos
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_alumno' => 'required|exists:alumnos,id_alumno',
            'id_concepto' => 'required|exists:conceptos_pago,id_concepto',
            'monto_final' => 'required|numeric|min:0',
            'estado' => 'required|in:Pagado,Pendiente,Cancelado',
        ]);

        Pago::create([
            'id_alumno' => $validated['id_alumno'],
            'id_concepto' => $validated['id_concepto'],
            'monto_original' => $validated['monto_final'],
            'monto_final' => $validated['monto_final'],
            'fecha_pago' => now(),
            'estado' => $validated['estado'],
        ]);

        return redirect()->back()->with('success', 'Pago registrado correctamente.');
    }
}