<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Target;

class TargetController extends Controller
{
    public function index()
    {
        $targets = Target::all();
        return response()->json($targets);
    }

    public function store(Request $request)
    {
        $target = new Target([
            'description' => $request->get('description'),
            'time' => $request->get('time'),
            'completed' => false
        ]);
        $target->save();
    }

    public function edit($id)
    {
        $target = Target::find($id);
        return response()->json($target);
    }

    public function update(Request $request, $id)
    {
        $target = Target::find($id);
        $target->description = $request->get('description');
        $target->time = $request->get('time');
        $target->save();
    }

    public function destroy($id)
    {
        $target = Target::find($id);
        $target->delete();
    }

    public function complete(Request $request)
    {
        $id = $request->get('id');
        $target = Target::find($id);
        $target->completed = true;
        $target->save();
    }
}