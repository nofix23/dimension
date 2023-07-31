<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'country',
        'city',
        'postal_code',
        'street',
        'house_number',
        'door_bell',
        'email_address',
        'phone_number',
        'user_id',
        'comment',
        'active',
    ];

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
