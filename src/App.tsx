import * as React from "react"
import { Search, ShoppingCart, TrendingUp, PlayCircle, PauseCircle, Plus, X, Users, Star, ArrowUpRight, DollarSign, Percent, ShoppingBag } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LojoGroupBuy() {
  const [category, setCategory] = React.useState("")
  const [subcategory, setSubcategory] = React.useState("")
  const [product, setProduct] = React.useState("")
  const [accumulationTime, setAccumulationTime] = React.useState("")
  const [isAccumulationActive, setIsAccumulationActive] = React.useState(true)
  const [quantity, setQuantity] = React.useState(1)
  const [accumulationGroup, setAccumulationGroup] = React.useState([])
  const [showDepositPrompt, setShowDepositPrompt] = React.useState(false)
  const [existingAccumulation, setExistingAccumulation] = React.useState({
    Fans: {
      count: 562,
      members: 10,
      date: "2023-11-20"
    },
    Tables: null
  })

  const categories = ["Electricals", "Furniture"]
  const subcategories = {
    Electricals: ["Appliances"],
    Furniture: ["Home"]
  }
  const products = {
    Appliances: ["Fans"],
    Home: ["Tables"]
  }


  const brands = [
    { name: "Orient Electric", contact: "123-456-7890", email: "orient@example.com", preference: 4 },
    { name: "Havells", contact: "234-567-8901", email: "havells@example.com", preference: 5 },
    { name: "Bajaj", contact: "345-678-9012", email: "bajaj@example.com", preference: 3 },
    { name: "Atomberg", contact: "456-789-0123", email: "atomberg@example.com", preference: 2 },
    { name: "Crompton", contact: "567-890-1234", email: "crompton@example.com", preference: 1 },
  ].sort((a, b) => b.preference - a.preference)

  const handleAccumulationToggle = () => {
    setIsAccumulationActive(!isAccumulationActive)
  }

  const handleCreateOrJoinGroup = () => {
    if (!product) return;
    const newItem = {
      id: Date.now(),
      product: product,
      quantity: quantity,
      price: 1000 * quantity, // Assuming a price of 1000 per unit
    }
    setAccumulationGroup([...accumulationGroup, newItem])
    setShowDepositPrompt(true)

    // If creating a new group for Tables, update the existingAccumulation
    if (product === "Tables") {
      setExistingAccumulation(prev => ({
        ...prev,
        Tables: {
          count: quantity,
          members: 1,
          date: new Date().toISOString().split('T')[0] // Current date
        }
      }))
    }
  }

  const handleRemoveFromAccumulationGroup = (itemId) => {
    setAccumulationGroup(accumulationGroup.filter(item => item.id !== itemId))
  }

  const totalAccumulationValue = accumulationGroup.reduce((sum, item) => sum + item.price, 0)
  const depositAmount = totalAccumulationValue * 0.01

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-gradient-to-r from-primary to-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 right-0 transform translate-y-1/2"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="fill-background"
              d="M0,0 C0,0 0,100 0,100 C200,100 400,100 600,100 C800,100 1000,100 1000,100 L1000,0 L0,0 Z"
            />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-background sm:text-5xl md:text-6xl">
              Empowering Businesses Through Collaborative Buying
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-background/90 text-center px-4">
              Lojo connects buyers and sellers for mutual growth, enabling buyers to save through bulk purchases and sellers to boost revenue with larger orders.
            </p>
            <div className="mt-8 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <Button size="lg" className="w-full sm:w-auto text-lg py-6 px-8">
                Join Lojo Today
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow"
          >
            <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" className="text-background" />
            <path
              d="M60 2C60 2 76 18 76 60C76 102 60 118 60 118"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary"
            />
            <path
              d="M60 2C60 2 44 18 44 60C44 102 60 118 60 118"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
        </div>
      </section>

      <main className="flex-grow">
        <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8 w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={subcategory} onValueChange={setSubcategory} disabled={!category}>
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subcategories</SelectLabel>
                  {category && subcategories[category].map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={product} onValueChange={setProduct} disabled={!subcategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  {subcategory && products[subcategory].map((prod) => (
                    <SelectItem key={prod} value={prod}>{prod}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={accumulationTime} onValueChange={setAccumulationTime}>
              <SelectTrigger>
                <SelectValue placeholder="Accumulation time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {product && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6">
              {brands.map((brand, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {brand.name}
                      <span className="text-yellow-500 flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {brand.preference}
                      </span>
                    </CardTitle>
                    <CardDescription>Preference Rank: {index + 1}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          <Card className="bg-primary/5 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Accumulation Box
                </span>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="accumulation-mode"
                    checked={isAccumulationActive}
                    onCheckedChange={handleAccumulationToggle}
                  />
                  <Label htmlFor="accumulation-mode">
                    {isAccumulationActive ? (
                      <span className="flex items-center text-green-600">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <PauseCircle className="h-4 w-4 mr-1" />
                        Inactive
                      </span>
                    )}
                  </Label>
                </div>
              </CardTitle>
              <CardDescription>Join or create a group buy for better deals!</CardDescription>
            </CardHeader>
            <CardContent>
              {isAccumulationActive ? (
                <div className="space-y-4">
                  {product === "Fans" ? (
                    <div>
                      <p className="text-lg font-semibold">
                        Existing group for Fans
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Members: {existingAccumulation.Fans.members} | Orders: {existingAccumulation.Fans.count}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Accumulation confirming on: {existingAccumulation.Fans.date}
                      </p>
                    </div>
                  ) : product === "Tables" ? (
                    <div>
                      <p className="text-lg font-semibold">No existing group for Tables</p>
                      <p className="text-sm text-muted-foreground">
                        Create a new group to start accumulating!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-semibold">Select a product to see group status</p>
                      <p className="text-sm text-muted-foreground">Choose from fans or tables</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        placeholder="Quantity" 
                        className="w-24" 
                        min="1" 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      />
                      <Button onClick={handleCreateOrJoinGroup} disabled={!product}>
                        {product === "Fans" ? (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Join Group
                          </>
                        ) : (
                          <>
                            <Users className="mr-2 h-4 w-4" />
                            Create Group
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Potential savings with group buy: 15%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold mb-4">Accumulation is currently inactive</p>
                  <p className="text-sm text-muted-foreground">Start accumulating to unlock group buying power and save more!</p>
                  <Button onClick={handleAccumulationToggle}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Accumulation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {accumulationGroup.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Accumulation Group</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accumulationGroup.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveFromAccumulationGroup(item.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>Total Accumulation Value: ${totalAccumulationValue.toFixed(2)}</div>
                <div>Required Deposit (1%): ${depositAmount.toFixed(2)}</div>
              </CardFooter>
            </Card>
          )}

          <Dialog open={showDepositPrompt} onOpenChange={setShowDepositPrompt}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deposit Required</DialogTitle>
                <DialogDescription>
                  To confirm your participation in the accumulation group, please deposit 1% of the total value.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-lg font-semibold">Deposit Amount: ${depositAmount.toFixed(2)}</p>
                <Button className="mt-4" onClick={() => setShowDepositPrompt(false)}>
                  Proceed to Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="relative py-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-lg font-medium text-muted-foreground">
                Savings Overview
              </span>
            </div>
          </div>
          <SavingsDashboard />
        </div>
      </main>
    </div>
  )
}

function SavingsDashboard() {
  const data = [
    { month: "Jan", savings: 2400 },
    { month: "Feb", savings: 1398 },
    { month: "Mar", savings: 9800 },
    { month: "Apr", savings: 3908 },
    { month: "May", savings: 4800 },
    { month: "Jun", savings: 3800 },
    { month: "Jul", savings: 4300 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Lojo Partners Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Savings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bulk Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Discount
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Savings Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="savings" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bulk Purchases</CardTitle>
            <CardDescription>
              You saved big on these recent orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Office Materials
                  </p>
                  <p className="text-sm text-muted-foreground">
                    200 units
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <div className="text-green-600">-$280.00</div>
                  <div className="text-xs text-muted-foreground">18.9% saved</div>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>EP</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Electronics Parts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    500 units
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <div className="text-green-600">-$175.00</div>
                  <div className="text-xs text-muted-foreground">14% saved</div>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Packaging Containers
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1000 units
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <div className="text-green-600">-$300.00</div>
                  <div className="text-xs text-muted-foreground">25% saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}