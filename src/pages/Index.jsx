import { Footer } from "@/components/ui/footer";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-01-01', amount: 100, type: 'expense', brand: 'Nike' },
    { id: 2, date: '2023-02-01', amount: 200, type: 'income', brand: 'Adidas' },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', type: '', brand: '' });
  const [editTransaction, setEditTransaction] = useState(null);

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    setNewTransaction({ date: '', amount: '', type: '', brand: '' });
  };

  const handleEditTransaction = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id ? editTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setEditTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Add a new sneaker transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              placeholder="Date"
            />
          </div>
          <div className="mb-4">
            <Input
              type="number"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <Select
              value={newTransaction.type}
              onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Select
              value={newTransaction.brand}
              onValueChange={(value) => setNewTransaction({ ...newTransaction, brand: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddTransaction}>Add Transaction</Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>List of sneaker transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.brand}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="outline" onClick={() => setEditTransaction(transaction)}>Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Transaction</DialogTitle>
                          </DialogHeader>
                          <div className="mb-4">
                            <Input
                              type="date"
                              value={editTransaction?.date || ''}
                              onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                              placeholder="Date"
                            />
                          </div>
                          <div className="mb-4">
                            <Input
                              type="number"
                              value={editTransaction?.amount || ''}
                              onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
                              placeholder="Amount"
                            />
                          </div>
                          <div className="mb-4">
                            <Select
                              value={editTransaction?.type || ''}
                              onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mb-4">
                            <Select
                              value={editTransaction?.brand || ''}
                              onValueChange={(value) => setEditTransaction({ ...editTransaction, brand: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Nike">Nike</SelectItem>
                                <SelectItem value="Adidas">Adidas</SelectItem>
                                <SelectItem value="Puma">Puma</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={() => handleEditTransaction(transaction.id)}>Save</Button>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Index;