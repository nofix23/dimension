<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyContact extends Model
{
    protected $fillable = [
        'name',
        'email_address',
        'phone_number',
        'type',
        'company_id'
    ];

    use HasFactory;
}