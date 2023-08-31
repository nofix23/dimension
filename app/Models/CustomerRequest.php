<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email_address',
        'phone_number',
        'subject',
        'materials',
        'comments'
    ];
}
