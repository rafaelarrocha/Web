<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Panel;
use Filament\Models\Contracts\FilamentUser;

 
class User extends Authenticatable implements FilamentUser
{


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


    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
    ]; 



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
