<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::with('rol')->orderBy('nombre')->get();
        $roles = Rol::all();

        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|string|lowercase|email|max:150|unique:usuarios',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'id_rol' => 'required|exists:roles,id_rol',
        ]);

        Usuario::create([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'id_rol' => $validated['id_rol'],
            'activo' => true,
            'email_verified_at' => now(), // Para que no pida verificar correo
        ]);

        return redirect()->back()->with('success', 'Usuario creado correctamente.');
    }

    public function update(Request $request, Usuario $usuario)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|string|lowercase|email|max:150|unique:usuarios,email,' . $usuario->id_usuario . ',id_usuario',
            'id_rol' => 'required|exists:roles,id_rol',
            'activo' => 'boolean'
        ]);

        $usuario->update($validated);

        return redirect()->back()->with('success', 'Usuario actualizado correctamente.');
    }
}