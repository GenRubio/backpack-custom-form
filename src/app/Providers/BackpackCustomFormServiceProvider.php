<?php

namespace Genrubio\BackpackCustomForm\App\Providers;

use Illuminate\Support\ServiceProvider;

class BackpackCustomFormServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'backpack-custom-form');
        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'backpack-custom-form');
        $this->publishes([
            __DIR__.'/../../public' => public_path('vendor/backpack-custom-form'),
            __DIR__.'/../resources/views/vendor/backpack/crud/fields' => resource_path('views/vendor/backpack/crud/fields'),
        ], 'backpack-custom-form');
    }
}
