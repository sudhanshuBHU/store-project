'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { successToast, errorToast } from '@/utils/toast';
import { ShowSells } from './ShowSells';
import { ISell, Idate } from '@/types/sell.type';



const AddTransactions = () => {

    const [transactionType, setTransactionType] = useState<('wholesale' | 'store')>('store');
    const [transactionPackets, setTransactionPackets] = useState<number>(1);
    const [transactionAmount, setTransactionAmount] = useState<number>(10);
    const [transactionDate, setTransactionDate] = useState<Idate>({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sells, setSells] = useState<ISell[]>([]);
    const [sellsLoading, setSellsLoading] = useState<boolean>(false);
    const [dailyAmount, setDailyAmount] = useState<number>(0);

    useEffect(() => {
        const fetchSells = async () => {
            setSellsLoading(true);
            const res: Response = await fetch('/api/sell', {
                method: 'GET'
            });
            const data: { sells: ISell[], totalSells: number } = await res.json();
            setSells(data.sells);
            setDailyAmount(data.totalSells);
            setSellsLoading(false);
        };
        fetchSells();
    }, [isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (transactionPackets <= 0) {
            errorToast('Packets cannot be zero');
            setIsLoading(false);
            return;
        }
        if (transactionDate.day <= 0 || transactionDate.month <= 0 || transactionDate.year <= 0) {
            errorToast('Date cannot be zero');
            setIsLoading(false);
            return;
        }
        // console.log("before sending to server",transactionType, transactionPackets, transactionAmount, transactionDate);
        // pending: add the transaction to the database
        try {
            const response = await fetch('/api/sell', {
                method: 'POST',
                body: JSON.stringify({ transactionType, transactionPackets, transactionAmount, day: transactionDate.day, month: transactionDate.month, year: transactionDate.year }),
            });

            if (!response.ok) {
                errorToast('Failed to add transaction');
                setIsLoading(false);
                return;
            }
            successToast('Transaction added successfully');

            setTransactionPackets(1);
            setTransactionAmount(10);
            setTransactionDate({
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            });
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
                <p className="text-green-500">Daily Amount: ₹{dailyAmount}</p>
                <p className="text-green-500">Total Sells: {sells.length}</p>
            </div>
            <div className='flex items-center justify-center -mb-3 mt-2'>
                <h2 className='text-2xl font-bold'>Add Transactions</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">

                {/* type of transaction: from where transaction is coming from. Store or Wholesale */}
                <div>
                    <label className="block mb-1 font-bold text-red-500">Transaction Type</label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                value="store"
                                checked={transactionType === 'store'}
                                onChange={() => setTransactionType('store')}
                            />
                            <span className="ml-2">Store</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                value="wholesale"
                                checked={transactionType === 'wholesale'}
                                onChange={() => setTransactionType('wholesale')}
                            />
                            <span className="ml-2">Wholesale</span>
                        </label>
                    </div>
                </div>

                {/* packets: number of packets of the product */}
                <div>
                    <label className="block mb-1 font-medium">Packets</label>
                    <Input
                        type="number"
                        value={transactionPackets}
                        onChange={(e) => {
                            setTransactionPackets(Number(e.target.value));
                            setTransactionAmount(Number(e.target.value) * 10);
                        }}
                        required
                    />
                </div>

                {/* amount: amount of the product */}
                <div>
                    <label className="block mb-1 font-medium">Amount</label>
                    <Input
                        type="number"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(Number(e.target.value))}
                        required
                    />
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
                        onChange={(e) => setTransactionDate({
                            day: Number(e.target.value.split('/')[0]),
                            month: Number(e.target.value.split('/')[1]),
                            year: Number(e.target.value.split('/')[2]),
                        })}
                    />
                </div>

                {/* button to add transaction */}
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
                            Adding...
                        </>
                    ) : (
                        'Add Transaction'
                    )}
                </Button>
            </form>
            {
                sellsLoading ? (
                    <div className='flex items-center justify-center h-full'>
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className='text-gray-500'>Loading...</p>
                        </div>
                    </div>
                ) : sells.length > 0 ? (
                    <ShowSells sells={sells} isLoading={sellsLoading} setIsLoading={setIsLoading} />
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-500'>No sells for today</p>
                    </div>
                )
            }
        </>
    );
};

export default AddTransactions;
