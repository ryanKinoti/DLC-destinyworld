<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Child extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'children';

    // Relationships
    public function class(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Classes::class);
    }

    public function registers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Register::class);
    }

    public function families(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Family::class);
    }
}
