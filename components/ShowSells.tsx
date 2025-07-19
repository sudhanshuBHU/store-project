
import { SellBox } from './SellBox';
import { ISell } from '@/types/sell.type';

export const ShowSells = ({sells, isLoading, setIsLoading}: {sells: ISell[], isLoading: boolean, setIsLoading: (isLoading: boolean) => void}) => {

    return (
        <div className='pt-3'>
            {sells.map((sell, index) => (
                <SellBox key={sell._id} sell={sell} index={index} isLoading={isLoading} setIsLoading={setIsLoading} />
            ))}
        </div>
    );
};