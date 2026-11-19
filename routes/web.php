<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AlumnoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

    // Módulo de Alumnos
    Route::get('/alumnos', [AlumnoController::class, 'index'])->name('alumnos.index');
    Route::post('/alumnos', [AlumnoController::class, 'store'])->name('alumnos.store');
    Route::put('/alumnos/{alumno}', [AlumnoController::class, 'update'])->name('alumnos.update');
    Route::delete('/alumnos/{alumno}', [AlumnoController::class, 'destroy'])->name('alumnos.destroy');

        // Módulo de Pagos
    Route::get('/pagos', [\App\Http\Controllers\PagoController::class, 'index'])->name('pagos.index');
    Route::post('/pagos', [\App\Http\Controllers\PagoController::class, 'store'])->name('pagos.store');
});

require __DIR__.'/auth.php';