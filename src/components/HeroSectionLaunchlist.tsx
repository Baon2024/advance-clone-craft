import { WaitlistFormMinimal } from "./waitlistFormMinimal.tsx"

export default function HeroSectionLaunchlist() {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <section className="h-full flex items-center px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center h-full">
            {/* Left Column */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="text-sm text-gray-500 font-mono tracking-wider">
                  CAMBRIDGE UNIVERSITY / PHD RESEARCH / 2025
                </div>

                <h1 className="text-7xl lg:text-8xl font-light text-gray-900 leading-none tracking-tight">
                  Salary
                  <br />
                  <span className="italic">Frequency</span>
                  <br />
                  Study
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                  Investigating the impact of flexible salary payment schedules on employee well-being. A one-month
                  research study with full participant autonomy.
                </p>

                <div className="bg-gray-100 border-l-4 border-gray-300 p-6 max-w-lg">
                  <div className="text-gray-400 font-mono text-xs mb-2 tracking-wider">ELIGIBILITY REQUIREMENT</div>
                  <p className="text-gray-700 font-light">
                    Participants must currently receive a salary from some form of existing employment to be eligible
                    for this study.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-px bg-gray-200"></div>
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <div className="text-gray-400 font-mono mb-2">DURATION</div>
                    <div className="text-gray-900">1 Month</div>
                  </div>
                  <div>
                    <div className="text-gray-400 font-mono mb-2">FLEXIBILITY</div>
                    <div className="text-gray-900">Full Choice</div>
                  </div>
                  <div>
                    <div className="text-gray-400 font-mono mb-2">OVERSIGHT</div>
                    <div className="text-gray-900">Ethical Review</div>
                  </div>
                  <div>
                    <div className="text-gray-400 font-mono mb-2">COMMITMENT</div>
                    <div className="text-gray-900">Voluntary</div>
                  </div>
                </div>
                <div className="h-px bg-gray-200"></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-center">
              <WaitlistFormMinimal />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}