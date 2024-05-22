<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\Summarizers\Summarizer;
use App\Enuns;
use App\Enuns\OrderStatusEnum;
use App\Models\Product;
use Filament\Forms\Components\Select;


class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?int $navigationSort = 3;

    protected static ?string $navigationGroup = 'Shop';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Wizard::make([
                    Forms\Components\Wizard\Step::make('Detalhes do Pedido') 
                        ->schema([

                            Forms\Components\TextInput::make('number')
                                ->default('PE-' . random_int(100000, 999999)) 
                                ->disabled() 
                                ->dehydrated() 
                                ->required()
                                ->unique(ignoreRecord:true),

                            Forms\Components\Select::make(name:'customer_id')
                                ->relationship('customer', 'name')
                                ->searchable()
                                ->required(),

                            Forms\Components\Select::make('status')
                                ->options([
                                    'pendente' => Enuns\OrderStatusEnum::PENDING->value,
                                    'processando' => Enuns\OrderStatusEnum::PROCESSING->value,
                                    'completo' => Enuns\OrderStatusEnum::COMPLETED->value,
                                    'recusado' => Enuns\OrderStatusEnum::DECLINED->value,
                                ])
                                ->required(),

                             Forms\Components\MarkdownEditor::make('notes')
                        ]), 
                
                    Forms\Components\Wizard\Step::make('Itens do Pedido') 
                        ->schema([

                            Forms\Components\Select::make('product_id')
                                ->options(Product::query()->pluck('name', 'id'))
                                ->live()
                                ->required()
                                ->afterStateUpdated(fn ($state, Forms\Set $set) =>
                                    $set('unit_price', Product::find($state)?->price ?? 0)),

                            Forms\Components\TextInput::make('quantity')
                                ->numeric()
                                ->required()
                                ->default(1)
                                ->live(),

                             Forms\Components\TextInput::make('unit_price')
                                ->disabled() 
                                ->dehydrated()
                                ->numeric(), 
                                

                            Forms\Components\Placeholder::make('total_price')
                                ->label('Preço Total')
                                ->content(function ($get) { return $get('quantity') * $get('unit_price');
                                }),



                ])->columns(3)
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('customer.name')
                    ->searchable()
                    ->sortable(),


                Tables\Columns\TextColumn::make('status')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->date()
                    ->searchable()
                    ->sortable(),
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
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
