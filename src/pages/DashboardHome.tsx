import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface KPI {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: typeof Users;
  iconColor: string;
  iconBackground: string;
}

interface Transaction {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
}

const kpis: KPI[] = [
  {
    title: "Total Revenue",
    value: "$48,294",
    change: "12.8%",
    positive: true,
    icon: DollarSign,
    iconColor: "text-indigo-600",
    iconBackground: "bg-indigo-50",
  },
  {
    title: "Total Users",
    value: "12,840",
    change: "8.2%",
    positive: true,
    icon: Users,
    iconColor: "text-blue-600",
    iconBackground: "bg-blue-50",
  },
  {
    title: "Total Orders",
    value: "3,642",
    change: "4.5%",
    positive: true,
    icon: ShoppingCart,
    iconColor: "text-amber-600",
    iconBackground: "bg-amber-50",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "1.2%",
    positive: false,
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBackground: "bg-emerald-50",
  },
];

const transactions: Transaction[] = [
  {
    id: "#ORD-1001",
    customer: "John Smith",
    email: "john@example.com",
    product: "Premium Plan",
    amount: "$299.00",
    status: "Completed",
    date: "Nov 15, 2026",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "Basic Plan",
    amount: "$99.00",
    status: "Pending",
    date: "Nov 14, 2026",
  },
  {
    id: "#ORD-1003",
    customer: "Michael Brown",
    email: "michael@example.com",
    product: "Enterprise Plan",
    amount: "$599.00",
    status: "Completed",
    date: "Nov 13, 2026",
  },
  {
    id: "#ORD-1004",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "Premium Plan",
    amount: "$299.00",
    status: "Cancelled",
    date: "Nov 12, 2026",
  },
  {
    id: "#ORD-1005",
    customer: "David Wilson",
    email: "david@example.com",
    product: "Basic Plan",
    amount: "$99.00",
    status: "Completed",
    date: "Nov 11, 2026",
  },
];

const statusStyles: Record<Transaction["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

const DashboardHome = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Welcome section */}

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, Admin!
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your business today.
        </p>
      </section>

      {/* KPI Cards */}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {kpi.title}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {kpi.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.iconBackground} ${kpi.iconColor}`}
                >
                  <Icon size={23} />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-xs">
                {kpi.positive ? (
                  <ArrowUpRight
                    size={15}
                    className="text-emerald-600"
                  />
                ) : (
                  <ArrowDownRight
                    size={15}
                    className="text-red-600"
                  />
                )}

                <span
                  className={
                    kpi.positive
                      ? "font-semibold text-emerald-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {kpi.change}
                </span>

                <span className="text-slate-400">
                  vs last month
                </span>
              </div>
            </div>
          );
        })}

      </section>

      {/* Recent Transactions */}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Recent Transactions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your latest customer orders.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            View all
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-left">

            <thead className="bg-slate-50">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Amount",
                  "Status",
                  "Date",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                    {transaction.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {transaction.customer}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.email}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {transaction.product}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {transaction.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[transaction.status]}`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {transaction.date}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
          Showing {transactions.length} recent transactions
        </div>

      </section>

    </div>
  );
};

export default DashboardHome;