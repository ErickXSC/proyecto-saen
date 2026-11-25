<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\CarrilController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    $alumnosActivos = \App\Models\Alumno::where('estado', 'Activo')->count();
    $ingresosMes = \App\Models\Pago::whereMonth('fecha_pago', now()->month)
                                   ->whereYear('fecha_pago', now()->year)
                                   ->where('estado', 'Pagado')
                                   ->sum('monto_final');
    $adeudosPendientes = \App\Models\Pago::where('estado', 'Pendiente')->count();

    return Inertia::render('Dashboard', [
        'stats' => [
            'alumnos_activos' => $alumnosActivos,
            'ingresos_mes' => $ingresosMes,
            'adeudos_pendientes' => $adeudosPendientes,
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/alumnos', [AlumnoController::class, 'index'])->name('alumnos.index');
    Route::post('/alumnos', [AlumnoController::class, 'store'])->name('alumnos.store');
    Route::put('/alumnos/{alumno}', [AlumnoController::class, 'update'])->name('alumnos.update');
    Route::delete('/alumnos/{alumno}', [AlumnoController::class, 'destroy'])->name('alumnos.destroy');

    Route::get('/pagos', [PagoController::class, 'index'])->name('pagos.index');
    Route::post('/pagos', [PagoController::class, 'store'])->name('pagos.store');

    Route::get('/carriles', [CarrilController::class, 'index'])->name('carriles.index');
    Route::put('/carriles/{carril}', [CarrilController::class, 'update'])->name('carriles.update');

    Route::get('/horarios', [\App\Http\Controllers\HorarioController::class, 'index'])->name('horarios.index');
    Route::post('/horarios', [\App\Http\Controllers\HorarioController::class, 'store'])->name('horarios.store');
    Route::delete('/horarios/{horario}', [\App\Http\Controllers\HorarioController::class, 'destroy'])->name('horarios.destroy');

    Route::get('/horarios', [\App\Http\Controllers\HorarioController::class, 'index'])->name('horarios.index');
    Route::post('/horarios', [\App\Http\Controllers\HorarioController::class, 'store'])->name('horarios.store');
    Route::delete('/horarios/{horario}', [\App\Http\Controllers\HorarioController::class, 'destroy'])->name('horarios.destroy');
    Route::post('/horarios/{horario}/inscribir', [\App\Http\Controllers\HorarioController::class, 'inscribirAlumno'])->name('horarios.inscribir');

    Route::get('/inventario', [\App\Http\Controllers\InventarioController::class, 'index'])->name('inventario.index');
    Route::post('/inventario', [\App\Http\Controllers\InventarioController::class, 'store'])->name('inventario.store');
    Route::post('/inventario/{inventario}/prestar', [\App\Http\Controllers\InventarioController::class, 'prestar'])->name('inventario.prestar');
    Route::post('/inventario/devolver/{prestamo}', [\App\Http\Controllers\InventarioController::class, 'devolver'])->name('inventario.devolver');
});

require __DIR__.'/auth.php';