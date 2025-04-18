
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  isCollapsed = false
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSection = () => setIsOpen(!isOpen);

  const header = (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSection}
      className={`w-full flex items-center justify-${isCollapsed ? 'center' : 'between'} px-2 hover:bg-muted mb-1`}
    >
      {isOpen ? 
        <ChevronDown className={`h-4 w-4 ${!isCollapsed && 'mr-2'}`} /> : 
        <ChevronRight className={`h-4 w-4 ${!isCollapsed && 'mr-2'}`} />
      }
      {!isCollapsed && <span className="font-medium text-xs uppercase tracking-wider">{title}</span>}
    </Button>
  );

  return (
    <div className="py-2 border-b border-border/40 last:border-0">
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            {header}
          </TooltipTrigger>
          <TooltipContent side="right">
            {title}
          </TooltipContent>
        </Tooltip>
      ) : (
        header
      )}
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
