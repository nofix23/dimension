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
        'secondary_phone_number',
        'type',
        'company_id',
        'image_url'
    ];

    use HasFactory;
}
