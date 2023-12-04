<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parents extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'parents';

    // Relationships
    public function families(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Family::class);
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class);
    }
}
