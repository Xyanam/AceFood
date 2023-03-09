<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MeasureController extends Controller
{
    public function getMeasures()
    {
        $builder = DB::table('measures')
            ->select('measures.id', 'measures.measure')
            ->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->measure
                ];
            });
        return $builder;
    }
}
