<?php

namespace App\Enuns;



enum OrderStatusEnum: string {


    case PENDING = 'pendente'

    case PROCESSING = 'processando'

    case COMPLETED = 'completado'

    case DECLINED = 'recusado'

}