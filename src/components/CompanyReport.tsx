import React from "react";

interface CompanyReportProps {
  companyName?: string;
}

const CompanyReport: React.FC<CompanyReportProps> = ({
  companyName = "Volt Motors",
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg px-12 py-4 max-w-none mb-16"
      data-toc-container
    >
      <div className="space-y-8">
        {/* Main Title */}
        <div>
          <h1 className="text-[64px] font-semibold mb-8 font-financier text-blue-1000">
            Report
          </h1>
        </div>

        {/* Company Profile Section */}
        <div className="space-y-6">
          <h2
            id="company-profile"
            className="text-2xl font-semibold text-blue-900 mb-6"
          >
            Company Profile
          </h2>

          {/* Summary */}
          <div className="space-y-3">
            <h3 id="summary" className="text-lg font-semibold text-gray-900">
              Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Volt Motors is a rapidly growing EV company focused on
              affordability, advanced battery technology, and renewable energy
              integration. Positioned as a strong competitor to premium brands
              while catering to middle-income consumers globally.
            </p>
          </div>

          {/* Core Information */}
          <div className="space-y-4">
            <h3
              id="core-information"
              className="text-lg font-semibold text-gray-900"
            >
              Core Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-900">Industry:</span>{" "}
                <span className="text-gray-700">
                  Automotive and Renewable Energy
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Size:</span>{" "}
                <span className="text-gray-700">
                  Approximately 15,000 employees globally; $12 billion annual
                  revenue (FY 2023)
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Locations:</span>{" "}
                <span className="text-gray-700">
                  Headquarters in Austin, Texas, USA; manufacturing facilities
                  in the USA, Germany, and China; sales offices in over 25
                  countries.
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  Business Areas:
                </span>{" "}
                <span className="text-gray-700">
                  Electric vehicles (EVs), battery technology, energy solutions,
                  autonomous driving.
                </span>
              </div>
            </div>
          </div>

          {/* Market Information */}
          <div className="space-y-4">
            <h3
              id="market-information"
              className="text-lg font-semibold text-gray-900"
            >
              Market Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-900">
                  Market Position:
                </span>{" "}
                <span className="text-gray-700">
                  Rising challenger in the EV market, competing with premium
                  brands and legacy automakers transitioning to EVs. Known for
                  affordability and sustainability.
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  Competitors:
                </span>{" "}
                <span className="text-gray-700">
                  Tesla Motors, GreenFuture Energy Solutions, Rainforest
                  Commerce (Logistics EV Fleet).
                </span>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="space-y-4">
            <h3
              id="recent-updates"
              className="text-lg font-semibold text-gray-900"
            >
              Recent Updates
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Partnership with SunPath Ventures for next-gen battery
                  technology.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Expansion into Southeast Asia with plans for manufacturing
                  facilities in India.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Launch of VoltCargo Pro commercial EV for logistics companies.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Achieved carbon-neutral manufacturing across U.S.-based
                  facilities.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Company Analysis Section */}
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2
            id="company-analysis"
            className="text-2xl font-semibold text-blue-900 mb-6 font-financier"
          >
            Company Analysis
          </h2>

          {/* Key Financials */}
          <div className="space-y-4">
            <h3
              id="key-financials"
              className="text-lg font-semibold text-gray-900"
            >
              Key Financials
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Return on Equity (ROE):</span>{" "}
                  14.8%
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Current Ratio:</span> 1.6
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Net Income Margin:</span> 8.5%
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Debt to Assets:</span> 42%
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Asset Turnover:</span> 0.85
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Liabilities to Net Worth:</span>{" "}
                  1.2
                </span>
              </li>
            </ul>
          </div>

          {/* Moody's Rating */}
          <div className="space-y-4">
            <h3
              id="moodys-rating"
              className="text-lg font-semibold text-gray-900"
            >
              Moody's Rating
            </h3>
            <div className="space-y-2 text-gray-700">
              <div>
                <span className="font-semibold text-gray-900">
                  Credit Rating:
                </span>{" "}
                <span>A3 (stable outlook)</span>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-gray-900">
                  Credit Rating Trend
                </div>
                <p>
                  Moody's credit rating has remained stable at A3 for the past
                  three years, reflecting consistent financial performance and
                  manageable debt levels.
                </p>
                <div>
                  <span className="font-medium">Total Assets:</span> $28 billion
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="space-y-4">
            <h3
              id="revenue-breakdown"
              className="text-lg font-semibold text-gray-900"
            >
              Revenue Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-gray-900 mb-2">
                  Primary Lines of Business:
                </div>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Electric Vehicles (EVs): 65% of total revenue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Battery Technology and Energy Solutions: 25% of total
                      revenue
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Autonomous Driving Software (VoltPilot): 10% of total
                      revenue
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">
                  Performance Indicators:
                </div>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>EV sales grew by 18% YoY in FY 2023.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Battery technology division reported a 12% increase in
                      revenue due to growing demand for energy storage
                      solutions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReport;
