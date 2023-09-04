<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_contacts', function (Blueprint $table) {
            $table->id();
            $table->text("type");
            $table->integer("company_id")->nullable();
            $table->text("name")->nullable();
            $table->text("email_address")->nullable();
            $table->text("phone_number")->nullable();
            $table->text("secondary_phone_number")->nullable();
            $table->text("image_url")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_contacts');
    }
};
