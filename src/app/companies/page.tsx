import {
  Building2,
  TrendingUp,
  MapPin,
  Users,
  Filter,
  SortAsc,
} from "lucide-react";
import { CompaniesPageHeader } from "@/components/pageHeader";

export default function CompaniesPage() {
  const companies = [
    {
      id: "1",
      name: "Tesla Inc.",
      industry: "Electric Vehicles",
      location: "Palo Alto, CA",
      rating: "B1",
      employees: "99,290",
      marketCap: "$800B",
      description: "Leading electric vehicle and clean energy company.",
    },
    {
      id: "2",
      name: "Microsoft Corporation",
      industry: "Technology",
      location: "Redmond, WA",
      rating: "Aaa",
      employees: "221,000",
      marketCap: "$3.1T",
      description: "Multinational technology corporation.",
    },
    {
      id: "3",
      name: "JPMorgan Chase & Co.",
      industry: "Financial Services",
      location: "New York, NY",
      rating: "A1",
      employees: "293,723",
      marketCap: "$570B",
      description: "American multinational investment bank.",
    },
  ];

  function getRatingColor(rating: string) {
    if (rating.startsWith("A")) return "text-green-600 bg-green-50";
    if (rating.startsWith("B")) return "text-yellow-600 bg-yellow-50";
    if (rating.startsWith("C")) return "text-orange-600 bg-orange-50";
    return "text-gray-600 bg-gray-50";
  }

  return (
    <div>
      {/* Page Header */}
      <CompaniesPageHeader />

      {/* Main Content */}
      <div className="space-y-6 p-8">
        {/* Filter and Sort Controls */}
        <div className="flex justify-end items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <SortAsc className="w-4 h-4" />
            <span>Sort</span>
          </button>
        </div>

        {/* Companies Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-semibold text-slate-900">
              All Companies
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <Building2 className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {company.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm text-slate-900">
                          {company.industry}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                          company.rating
                        )}`}
                      >
                        {company.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm text-slate-900">
                          {company.employees}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {company.marketCap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm text-slate-900">
                          {company.location}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">
                  Total Companies
                </p>
                <p className="text-2xl font-bold text-slate-900">2,847</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                <p className="text-2xl font-bold text-slate-900">A2</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Industries</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
