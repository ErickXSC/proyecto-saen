php
    // Módulo de Convenios
    Route::get('/convenios', [\App\Http\Controllers\ConvenioController::class, 'index'])->name('convenios.index');
    Route::post('/convenios', [\App\Http\Controllers\ConvenioController::class, 'store'])->name('convenios.store');
    Route::put('/convenios/{convenio}', [\App\Http\Controllers\ConvenioController::class, 'update'])->name('convenios.update');
    Route::delete('/convenios/{convenio}', [\App\Http\Controllers\ConvenioController::class, 'destroy'])->name('convenios.destroy');
