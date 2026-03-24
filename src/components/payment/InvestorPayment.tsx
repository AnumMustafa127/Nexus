import React, { useState, useRef } from 'react'

const Payment = () => {
    const [ActiveDiv, setActiveDiv] = useState('')
    const [payment, setpayment] = useState(9000)
    const amount = useRef(0)
    const [result, setresult] = useState(null)
    const [lastAmount, setLastAmount] = useState(0)
    const [lastName, setLastName] = useState('')
    const sender = useRef('')
    const date = new Date(Date.now())
    const today = date.toLocaleDateString()
    function transferAmount() {
        var transferedAmount = Number(amount.current.value)
        var recieverName = sender.current.value
        if (!(transferedAmount <= 0 || sender.current.value == '')) {
            const r = confirm("are you sure you want to transfer")
            if (r == true) {
                setresult(r)
                setLastAmount(transferedAmount)
                setLastName(recieverName)
                amount.current.value = ''
                sender.current.value = ''
                setpayment(payment => payment - transferedAmount)
                console.log(number)
            }
            else {
                setresult(false)
                amount.current.value = ''
                sender.current.value = ''
            }
        }
        else {
            alert('please enter correct details')
        }
    }
    return (
        <main className='flex items-center justify-center h-screen min-w-full '>
            <div className=' h-5/6 w-10/12 gap-2 flex flex-col'>
                <h2 className='font-serif text-4xl'>Investor's Wallet</h2>
                <div className='flex min-h-fit rounded-md gap-2'>
                    <button onClick={() => { setActiveDiv('balance') }} className='bg-primary-600 font-serif p-2 rounded-md text-white'>Check balance</button>
                    <button onClick={() => { setActiveDiv('payment') }} className='bg-primary-600 font-serif p-2 rounded-md text-white'>transfer Payement</button>
                    <button onClick={() => { setActiveDiv('history') }} className='bg-primary-600 font-serif p-2 rounded-md text-white'>show History</button>
                    <button onClick={() => { setActiveDiv('invest') }} className='bg-primary-600 font-serif p-2 rounded-md text-white'>Invest</button>

                </div>
                {/* Balance Section */}
                {ActiveDiv == 'balance' && (
                    <div className='bg-white h-fit w-4/5 p-2'>Wallet Balance:  $ {payment}</div>
                )}
                {/* Payment Senction */}
                {ActiveDiv == 'payment' && (
                    <div className='bg-white h-5/6  '>
                        <div className='md:w-2/6 w-full flex flex-col p-3 gap-2'>
                            <input ref={amount} type="number" placeholder='Enter amount' className='border p-1 rounded-md border-gray-500' />
                            <input ref={sender} type="text" placeholder='Enter sender name (eg: bank/account name)' className='border p-1 rounded-md border-gray-500' />
                            <button onClick={transferAmount} className='bg-primary-600 font-serif p-2 rounded-md text-white'>transfer</button>
                        </div>
                        {result === true ? (
                            <div>Amount invested: {lastAmount} to {lastName} 's account</div>
                        ) : result === false ? (
                            <div className='text-error-700'>transfer failed please try again</div>
                        ) : null}
                        
                    </div>
                )}
                {/* History Section */}
                {ActiveDiv == 'history' && (
                    <div className='bg-white h-5/6 '>
                        <table className="border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black px-2">Date</th>
                                    <th className="border border-black px-2">Amount</th>
                                    <th className="border border-black px-2">Receiver</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="border border-black px-2">{today}</td>
                                    <td className="border border-black px-2">${lastAmount}</td>
                                    <td className="border border-black px-2">{lastName}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                )}
                {/* investment */}
                {ActiveDiv == 'invest' && (
                    <div className='bg-white h-5/6  '>
                        <div className='md:w-2/6 w-full flex flex-col p-3 gap-2'>
                            <input ref={amount} type="number" placeholder='Enter amount' className='border p-1 rounded-md border-gray-500' />
                            <input ref={sender} type="text" placeholder='Enter sender name (eg: bank/account name)' className='border p-1 rounded-md border-gray-500' />
                            <button onClick={transferAmount} className='bg-primary-600 font-serif p-2 rounded-md text-white'>invest</button>
                        </div>
                        {result === true ? (
                            <div>Amount invested: {lastAmount} to {lastName} Entrepreneur</div>
                        ) : result === false ? (
                            <div className='text-error-700'>investment failed please try again</div>
                        ) : null}
                    </div>
                )}

            </div>


        </main>
    )
}

export default Payment