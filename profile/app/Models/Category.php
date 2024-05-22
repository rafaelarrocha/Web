<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [

        'name', 'parent_id', 'description',

    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);    
    }

    public function products(): HasMany 
    {
        return $this->hasMany(Product::class);
    }


    
}
