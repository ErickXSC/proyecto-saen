<?php

namespace App\Http\Controllers;

use App\Models\Carril;
use App\Models\Profesor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarrilController extends Controller
{
    public function index()
    {
        $carriles = Carril::with('profesor.usuario')->orderBy('numero_carril', 'asc')->get();
        $profesores = Profesor::with('usuario')->get();

        return Inertia::render('Carriles/Index', [
            'carriles' => $carriles,
            'profesores' => $profesores
        ]);
    }

    public function update(Request $request, Carril $carril)
    {
        $validated = $request->validate([
            'id_profesor' => 'nullable|exists:profesores,id_profesor',
            'activo' => 'required|in:Disponible,Ocupado,Mantenimiento'
        ]);

        $carril->update([
            'id_profesor' => $validated['id_profesor'] ?: null,
            'activo' => $validated['activo'],
        ]);

        return redirect()->back()->with('success', 'Carril actualizado correctamente.');
    }
}