<?php

namespace App\Http\Controllers;

use App\Models\Kitchen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KitchenController extends Controller
{
    public function index()
    {
        return DB::table('kitchens')
            ->select('*')
            ->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->kitchen
                ];
            });
    }
}
