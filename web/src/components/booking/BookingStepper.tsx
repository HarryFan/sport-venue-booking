'use client'

const STEPS = ['選場館', '選時段', '確認', '支付']

interface Props {
  currentStep: number
}

export default function BookingStepper({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center py-3 overflow-x-auto">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className={`flex items-center justify-center rounded-full text-xs font-bold w-6 h-6 transition-colors ${
            i < currentStep ? 'bg-green-500 text-white' :
            i === currentStep ? 'bg-green-400 text-gray-900 shadow-lg shadow-green-500/40' :
            'bg-gray-700 text-gray-500'
          }`}>
            {i < currentStep ? '✓' : i + 1}
          </div>
          <span className={`mx-1 text-[10px] ${i === currentStep ? 'text-green-400 font-medium' : 'text-gray-500'}`}>
            {step}
          </span>
          {i < STEPS.length - 1 && <div className="w-3 h-px bg-gray-700 mx-1" />}
        </div>
      ))}
    </div>
  )
}
