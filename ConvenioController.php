php
<?php

namespace App\Http\Controllers;

use App\Models\Convenio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConvenioController extends Controller
{
    public function index()
    {
        $convenios = Convenio::orderBy('created_at', 'desc')->get();

        return Inertia::render('Convenios/Index', [
            'convenios' => $convenios
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_institucion' => 'required|string|max:150',
            'tipo_beneficio' => 'required|string|max:100',
            'descuento_porcentaje' => 'nullable|numeric|min:0|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'estado' => 'required|in:Activo,Inactivo'
        ]);

        Convenio::create($validated);

        return redirect()->back()->with('success', 'Convenio registrado correctamente.');
    }

    public function update(Request $request, Convenio $convenio)
    {
        $validated = $request->validate([
            'nombre_institucion' => 'required|string|max:150',
            'tipo_beneficio' => 'required|string|max:100',
            'descuento_porcentaje' => 'nullable|numeric|min:0|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'estado' => 'required|in:Activo,Inactivo'
        ]);

        $convenio->update($validated);

        return redirect()->back()->with('success', 'Convenio actualizado correctamente.');
    }

    public function destroy(Convenio $convenio)
    {
        $convenio->delete();
        return redirect()->back()->with('success', 'Convenio eliminado.');
    }
}