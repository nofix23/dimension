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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->text("company_name");
            $table->text("country")->nullable();
            $table->text("city")->nullable();
            $table->text("postal_code")->nullable();
            $table->text("street")->nullable();
            $table->integer("house_number")->nullable();
            $table->text("door_bell")->nullable();
            $table->text("email_address")->nullable();
            $table->text("phone_number")->nullable();
            $table->boolean("active")->default(false);
            $table->text("comment")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
