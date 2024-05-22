<?php

namespace App\Enuns;



enum OrderStatusEnum: string {
    case PENDING = 'pendente';
    case PROCESSING = 'processando';
    case COMPLETED = 'completo';
    case DECLINED = 'recusado';
}