'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { successToast, errorToast } from '@/utils/toast';
import { Idate, IBuy } from '@/types/sell.type';
import { ShowBuys } from './ShowBuys';

const BuyStock = () => {
    const [stock, setStock] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [transactionDate, setTransactionDate] = useState<Idate>({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalBuy, setTotalBuy] = useState<number>(0);
    const [totalStock, setTotalStock] = useState<number>(0);
    const [buys, setBuys] = useState<IBuy[]>([]);
    const [buysLoading, setBuysLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTotalBuy = async () => {
            try {
                setBuysLoading(true);
                const response = await fetch('/api/buy', {
                    method: 'GET',
                });
                const data = await response.json();
                setBuys(data.buys);
                setTotalBuy(data.totalBuy);
                setTotalStock(data.totalStock);
            } catch (error) {
                errorToast('Failed to fetch total buy amount');
                console.log(error);
                
            } finally {
                setBuysLoading(false);
            }
        }
        fetchTotalBuy();
    }, [isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (stock <= 0) {
            errorToast('Stock cannot be zero');
            setIsLoading(false);
            return;
        }
        if (transactionDate.day <= 0 || transactionDate.month <= 0 || transactionDate.year <= 0) {
            errorToast('Date cannot be zero');
            setIsLoading(false);
            return;
        }
        // pending: add the transaction to the database
        try {
            const response = await fetch('/api/buy', {
                method: 'POST',
                body: JSON.stringify({ stock, amount, day: transactionDate.day, month: transactionDate.month, year: transactionDate.year }),
            });

            if (!response.ok) {
                errorToast('Failed to add transaction');
                setIsLoading(false);
                return;
            }
            successToast('Transaction added successfully');
            // Optionally reset form
            setStock(0);
            setAmount(0);
        } catch (error) {
            errorToast('Failed to add transaction');
            console.error('Error adding transaction:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex font-bold items-center justify-between">
                <p className="text-red-500">Total Buy: ₹{totalBuy}</p>
                <p className="text-red-500">Total Stock: {totalStock} kg</p>
            </div>
            <div className='flex items-center justify-center -mb-4 mt-2'>
                <h2 className='text-2xl font-bold'>Buy Khaini</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
                {/* stock: number of kg of khaini */}
                <div>
                    <label className="block mb-1 font-medium">Stock</label>
                    <Input
                        type="number"
                        value={stock}
                        onChange={e => setStock(Number(e.target.value))}
                        required
                    />
                    <span className='-ml-8 text-gray-500'>KG</span>
                </div>
                {/* amount: total amount of the khaini */}
                <div>
                    <label className="block mb-1 font-medium">Amount</label>
                    <div className='relative'>

                        <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'>Rs</span>
                        <Input
                            className='pl-8'
                            type="number"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            required
                        />
                    </div>
                </div>
                {/* date: date of the transaction */}
                <div>
                    <label className="block mb-1 font-medium">Date</label>
                    <Input
                        type="text"
                        value={
                            transactionDate && transactionDate.day && transactionDate.month && transactionDate.year
                                ? `${transactionDate.day}/${transactionDate.month}/${transactionDate.year}`
                                : ''
                        }
                        onChange={e => setTransactionDate({
                            day: Number(e.target.value.split('/')[0]),
                            month: Number(e.target.value.split('/')[1]),
                            year: Number(e.target.value.split('/')[2]),
                        })}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Buying...
                        </>
                    ) : (
                        'Buy'
                    )}
                </Button>
            </form>
            {
                buysLoading ? (
                    <div className='flex items-center justify-center h-full'>
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className='text-gray-500'>Loading...</p>
                        </div>
                    </div>
                ) : buys.length > 0 ? (
                    <ShowBuys buys={buys} />
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-500'>No buys this Month</p>
                    </div>
                )
            }
        </>
    );
};

export default BuyStock;
