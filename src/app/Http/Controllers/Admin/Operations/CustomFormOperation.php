<?php

namespace Genrubio\BackpackCustomForm\App\Http\Controllers\Admin\Operations;

use Illuminate\Support\Facades\Route;

trait CustomFormOperation
{
    /**
     * Define which routes are needed for this operation.
     *
     * @param  string  $name  Name of the current entity (singular). Used as first URL segment.
     * @param  string  $routeName  Prefix of the route name.
     * @param  string  $controller  Name of the current CrudController.
     */
    protected function setupCustomFormRoutes($segment, $routeName, $controller)
    {
        Route::post($segment . '/custom-form-data', [
            'as'        => $routeName . '.custom-form-data',
            'uses'      => $controller . '@customFormDataView'
        ]);
    }

    public function customFormDataView()
    {
        return view('backpack-custom-form::vendor.backpack.views.custom-form.view', ['request' => request()])->render();
    }
}
