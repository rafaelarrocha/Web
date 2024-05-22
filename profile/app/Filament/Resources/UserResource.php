<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\RawJs;
use Illuminate\Validation\Rule;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\TextInput::make(name:'name')
                ->placeholder('Insira o nome'),

                Forms\Components\TextInput::make(name:'phone')
                    ->mask(RawJs::make(<<<'JS'
                         $input.length >= 14 ? '(99)99999-9999' : '(99)9999-9999'
                        JS))
                    ->placeholder('Insira o telefone'),

                Forms\Components\TextInput::make(name:'email')
                    ->placeholder('Insira o email'),  

                Forms\Components\Select::make(name:'role')
                    ->options([
                    'ADMIN' => 'Admin',
                    'EDITOR' => 'Editor',
                    'USER' => 'User',
                ])
                    ->default('USER'),

                    Forms\Components\TextInput::make('password')
                    ->placeholder('Insira a senha')
                    ->password()
                    ->required()
                    ->minLength(8),
        
                
            ]);
        
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make(name:'name'),
                Tables\Columns\TextColumn::make(name:'email'),
                Tables\Columns\TextColumn::make(name:'phone'),
                Tables\Columns\TextColumn::make(name:'role'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make
                ([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),               
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
