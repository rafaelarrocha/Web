<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [

        'name', 'url', 'description',

    ];
    const ROLE_ADMIN = 'ADMIN'; 

    const ROLE_EDITOR = 'EDITOR'; 

    const ROLE_USER = 'USER'; 

    const ROLES = [
        self::ROLE_ADMIN =>'Admin',
        self::ROLE_EDITOR =>'Editor',
        self::ROLE_USER =>'User',
    ];

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin() || $this->isEditor() || $this->isUser();
    }

    public function isAdmin() {

        return $this->role === self::ROLE_ADMIN;

    }

    public function isEditor(){

        return $this->role === self::ROLE_EDITOR;
    }

    public function isUser(){

        return $this->role === self::ROLE_USER;
    }
    public function brands(): HasMany 

    {      
        return $this->hasMany(Product::class);
    }

    public function categories(): HasMany 

    {      
        return $this->hasMany(Category::class);
    }
    
}
