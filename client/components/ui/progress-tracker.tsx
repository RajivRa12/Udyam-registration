import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressStep {
  id: string;
  title: string;
  description?: string;
}

export interface ProgressTrackerProps {
  steps: ProgressStep[];
  currentStep: string;
  completedSteps: string[];
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  currentStep,
  completedSteps,
  className
}) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: string) => stepId === currentStep;

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-government-gray">
            Step {getCurrentStepIndex() + 1} of {steps.length}
          </span>
          <span className="text-sm text-government-gray">
            {Math.round(((getCurrentStepIndex() + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-government-gray-light rounded-full h-2">
          <div
            className="bg-government-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-government-blue">
            {steps[getCurrentStepIndex()]?.title}
          </h3>
          {steps[getCurrentStepIndex()]?.description && (
            <p className="text-sm text-government-gray mt-1">
              {steps[getCurrentStepIndex()].description}
            </p>
          )}
        </div>
      </div>

      {/* Desktop Step Progress */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const isCompleted = isStepCompleted(step.id);
              const isCurrent = isStepCurrent(step.id);

              return (
                <li key={step.id} className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                        isCompleted
                          ? "bg-government-green border-government-green text-white"
                          : isCurrent
                          ? "bg-government-blue border-government-blue text-white"
                          : "border-government-gray-light text-government-gray bg-white"
                      )}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="ml-3">
                      <div
                        className={cn(
                          "text-sm font-semibold transition-colors duration-200",
                          isCompleted || isCurrent
                            ? "text-government-blue"
                            : "text-government-gray"
                        )}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-xs text-government-gray mt-1">
                          {step.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-16 transition-colors duration-200",
                        isCompleted ? "bg-government-green" : "bg-government-gray-light"
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export { ProgressTracker };
