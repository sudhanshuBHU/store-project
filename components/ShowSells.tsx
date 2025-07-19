
import { SellBox } from './SellBox';
import { ISell } from '@/types/sell.type';

export const ShowSells = ({sells}: {sells: ISell[]}) => {

    return (
        <div className='pt-3'>
            {sells.map((sell, index) => (
                <SellBox key={sell._id} sell={sell} index={index} />
            ))}
        </div>
    );
};