import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface JsonGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonGuideModal: React.FC<JsonGuideModalProps> = ({ isOpen, onClose }) => {
  const codeBlockStyle = "bg-terminal-bg text-terminal-text p-4 rounded-lg font-mono text-sm overflow-x-auto";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5 text-primary" />
            Panduan Struktur JSON
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Switch Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary">1. SWITCH DIGITAL (0 ATAU 1)</h3>
            <pre className={codeBlockStyle}>
{`"lampu_teras": {
  "type": "switch",
  "value": 1
}`}
            </pre>
            <p className="text-sm text-muted-foreground">
              * Gunakan 0 untuk OFF dan 1 untuk ON.
            </p>
          </div>

          {/* Dimmer Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary">2. DIMMER ANALOG (SLIDER)</h3>
            <pre className={codeBlockStyle}>
{`"kipas_angin": {
  "type": "dimmer",
  "value": 512,
  "upper_limit": 1024,
  "unit": "RPM"
}`}
            </pre>
          </div>

          {/* Sensor Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary">3. SENSOR TELEMETRI (GRAFIK)</h3>
            <pre className={codeBlockStyle}>
{`"suhu_ruang": {
  "type": "sensor",
  "value": 28.5,
  "upper_limit": 100,
  "unit": "°C"
}`}
            </pre>
          </div>

          {/* Full Example */}
          <div className="space-y-3 border-t border-border pt-4">
            <h3 className="font-semibold text-foreground">Complete Example Structure</h3>
            <pre className={codeBlockStyle}>
{`{
  "iot": {
    "monitoring": {
      "room_lamp": {
        "type": "switch",
        "value": 0
      },
      "room_fan": {
        "type": "switch",
        "value": 0
      },
      "humidity": {
        "type": "sensor",
        "value": 75,
        "upper_limit": 100,
        "unit": "%"
      },
      "temperature": {
        "type": "sensor",
        "value": 24.7,
        "upper_limit": 100,
        "unit": "°C"
      }
    }
  }
}`}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
