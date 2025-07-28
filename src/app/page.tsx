import { Building2, TrendingUp, Star, MapPin, Users, Calendar } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  rating: string;
  employees: string;
  founded: string;
  description: string;
}

const companies: Company[] = [
  {
    id: '1',
    name: 'Volt Motors',
    industry: 'Automotive Electric Vehicles',
    location: 'Austin, Texas, USA',
    rating: 'B+',
    employees: '500+',
    founded: '2015',
    description: 'Manufactures highly-efficient electric motors.'
  },
  {
    id: '2',
    name: 'Gamma Solutions',
    industry: 'Technology Artificial Intelligence',
    location: 'San Francisco, California, USA',
    rating: 'A',
    employees: '1,000+',
    founded: '2018',
    description: 'Leading provider of AI-driven analytics.'
  },
  {
    id: '3',
    name: 'Delta Innovations',
    industry: 'Biotechnology',
    location: 'Boston, Massachusetts, USA',
    rating: 'A-',
    employees: '250+',
    founded: '2020',
    description: 'Pioneering advancements in biotechnology.'
  },
  {
    id: '4',
    name: 'Epsilon Enterprises',
    industry: 'Automotive Vehicle Infrastructure',
    location: 'Los Angeles, California, USA',
    rating: 'B',
    employees: '1,200+',
    founded: '2017',
    description: 'Specialists in automotive vehicle infrastructure.'
  },
  {
    id: '5',
    name: 'Zeta Dynamics',
    industry: 'Information Technology',
    location: 'Seattle, Washington, USA',
    rating: 'A+',
    employees: '2,000+',
    founded: '2016',
    description: 'Innovations in cloud computing solutions.'
  },
  {
    id: '6',
    name: 'Theta Design',
    industry: 'Sustainable Fashion Technology',
    location: 'New York, New York, USA',
    rating: 'B+',
    employees: '150+',
    founded: '2019',
    description: 'Experts in sustainable fashion technology.'
  }
];

function getRatingColor(rating: string) {
  switch (rating.charAt(0)) {
    case 'A': return 'text-green-600 bg-green-50';
    case 'B': return 'text-yellow-600 bg-yellow-50';
    case 'C': return 'text-orange-600 bg-orange-50';
    case 'D': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Your Companies</h1>
        <p className="text-slate-600 mt-1">
          Tell me about the <span className="font-medium">size, industry, location</span> of the companies you want to start looking at.
        </p>
      </div>

      {/* Add Company Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Building2 className="w-4 h-4" />
            <span>Add all companies</span>
          </button>
        </div>
        <div className="text-sm text-slate-500">
          Here are the {companies.length} results for medium-sized tech companies, specifically those with 100-500 employees, located in NY area, and either privately owned or publicly traded.
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {/* Company Icon */}
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>

                {/* Company Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(company.rating)}`}>
                      {company.rating}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{company.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{company.employees}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Founded {company.founded}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Search by Companies Section */}
      <div className="mt-8 p-6 bg-slate-50 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Search by companies</h3>
        <p className="text-slate-600 mb-4">
          Please provide details about the medium-sized tech companies, specifically those with 100-500 employees, located in NY area, and either privately owned or publicly traded.
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Search by companies →
        </button>
      </div>
    </div>
  );
}
