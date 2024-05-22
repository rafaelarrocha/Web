<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory, SoftDeletes;

        protected $fillable = [

            'customer_id', 'number', 'stauts', 'total_price','notes',
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
    
        public function customer(): BelongsTo 
        {
            return $this->belongsTo(Customer::class);
        }

    

        public function product(): BelongsTo
        {
            return $this->belongsTo(Product::class);
        }
}
