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
        Schema::create('customer_requests', function (Blueprint $table) {
            $table->id();
            $table->boolean("accept")->default(false);
            $table->text("accepted_by")->nullable();
            $table->text("accepted_at")->nullable();
            $table->text("reverted_by")->nullable();
            $table->text("reverted_at")->nullable();
            $table->text("subject")->nullable();
            $table->text("materials")->nullable();
            $table->text("sizes")->nullable();
            $table->text("name")->nullable();
            $table->text("email_address")->nullable();
            $table->text("phone_number")->nullable();
            $table->text("comments")->nullable();
            $table->integer("status")->default(0);
            $table->integer("user_id")->nullable();
            $table->boolean("shipping")->nullable();
            $table->text("city")->nullable();
            $table->text("country")->nullable();
            $table->text("postal_code")->nullable();
            $table->text("street_number")->nullable();
            $table->text("house_number")->nullable();
            $table->text("door_bell")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_requests');
    }
};
