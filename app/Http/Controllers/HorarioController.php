<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use App\Models\Profesor;
use App\Models\Carril;
use App\Models\Alumno;
use App\Models\ClaseAlumno;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class HorarioController extends Controller
{
    public function index()
    {
        $horarios = Horario::with(['profesor.usuario', 'carril', 'alumnos'])
            ->orderBy('dia_semana')
            ->orderBy('hora_inicio')
            ->get();

        $profesores = Profesor::with('usuario')->get();
        $carriles = Carril::orderBy('numero_carril')->get();
        $alumnos = Alumno::where('estado', 'Activo')->get(); // Todos los alumnos disponibles para inscribir

        return Inertia::render('Horarios/Index', [
            'horarios' => $horarios,
            'profesores' => $profesores,
            'carriles' => $carriles,
            'alumnos' => $alumnos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_profesor' => 'required|exists:profesores,id_profesor',
            'id_carril' => 'required|exists:carriles,id_carril',
            'dia_semana' => 'required|string|max:15',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
        ]);

        // VALIDACIÓN: Un profesor no puede estar en dos horarios que se empalmen
        $empalme = Horario::where('id_profesor', $validated['id_profesor'])
            ->where('dia_semana', $validated['dia_semana'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('hora_inicio', [$validated['hora_inicio'], $validated['hora_fin']])
                      ->orWhereBetween('hora_fin', [$validated['hora_inicio'], $validated['hora_fin']])
                      ->orWhere(function ($q) use ($validated) {
                          $q->where('hora_inicio', '<=', $validated['hora_inicio'])
                            ->where('hora_fin', '>=', $validated['hora_fin']);
                      });
            })->exists();

        if ($empalme) {
            throw ValidationException::withMessages([
                'id_profesor' => 'El profesor ya tiene una clase en este horario.'
            ]);
        }

        Horario::create($validated);

        return redirect()->back()->with('success', 'Horario creado correctamente.');
    }

    public function destroy(Horario $horario)
    {
        $horario->delete();
        return redirect()->back()->with('success', 'Horario eliminado.');
    }

    // Nuevo método para inscribir alumnos
    public function inscribirAlumno(Request $request, Horario $horario)
    {
        $validated = $request->validate([
            'id_alumno' => 'required|exists:alumnos,id_alumno'
        ]);

        // Validar que el alumno no esté ya inscrito en este horario
        $inscrito = ClaseAlumno::where('id_horario', $horario->id_horario)
                               ->where('id_alumno', $validated['id_alumno'])
                               ->exists();

        if ($inscrito) {
            throw ValidationException::withMessages([
                'id_alumno' => 'El alumno ya está inscrito en este horario.'
            ]);
        }

        ClaseAlumno::create([
            'id_horario' => $horario->id_horario,
            'id_alumno' => $validated['id_alumno'],
            'fecha_inscripcion' => now()->toDateString(),
        ]);

        return redirect()->back()->with('success', 'Alumno inscrito correctamente.');
    }
}