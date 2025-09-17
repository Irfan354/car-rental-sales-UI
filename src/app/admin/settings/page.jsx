"use client";
import { useState } from "react";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

export default function VehicleInspectionChecklist() {
  const [inspections, setInspections] = useState({});
  const [remarks, setRemarks] = useState({});
  const [showRemarksDialog, setShowRemarksDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const checklistData = {
    "Exterior Condition": [
      "Scratches / Dents",
      "Paint Condition",
      "Windshield (cracks/chips)",
      "Windows & Mirrors",
      "Headlights / Taillights / Indicators",
      "Bumpers & Body Panels"
    ],
    "Tires & Wheels": [
      "Tire Tread Depth",
      "Tire Pressure",
      "Spare Tire Condition",
      "Wheel Alignment",
      "Rims / Alloy Condition"
    ],
    "Interior Condition": [
      "Seats (fabric/leather condition)",
      "Dashboard & Controls",
      "Seat Belts (functionality)",
      "AC / Heater Working",
      "Infotainment / Audio System",
      "Odor / Cleanliness"
    ],
    "Engine & Fluids": [
      "Engine Oil Level & Quality",
      "Coolant Level",
      "Brake Fluid",
      "Transmission Fluid",
      "Battery Health",
      "Fuel Level"
    ],
    "Brakes & Suspension": [
      "Brake Pads",
      "Brake Discs / Drums",
      "Suspension Noise",
      "Shock Absorbers",
      "Steering Alignment"
    ],
    "Lights & Electricals": [
      "Headlights High/Low Beam",
      "Indicators / Hazards",
      "Cabin Lights",
      "Horn",
      "Power Windows",
      "Wipers / Washer Fluid"
    ],
    "Safety & Documents": [
      "Insurance Papers",
      "Registration Certificate (RC)",
      "Pollution Certificate (PUC)",
      "Roadside Emergency Kit (jack, tools, first-aid)",
      "Fire Extinguisher"
    ]
  };

  // Toggle inspection status
  const toggleInspection = (category, item) => {
    const key = `${category}-${item}`;
    setInspections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Add remarks
  const addRemarks = (category, item) => {
    const key = `${category}-${item}`;
    setCurrentItem({ category, item, key });
    setShowRemarksDialog(true);
  };

  // Save remarks
  const saveRemarks = () => {
    if (currentItem) {
      setRemarks(prev => ({
        ...prev,
        [currentItem.key]: prev[currentItem.key] || ""
      }));
    }
    setShowRemarksDialog(false);
  };

  // Get inspection status with visual indicators
  const getStatusIcon = (isInspected) => {
    return isInspected ? "pi pi-check-circle text-green-500" : "pi pi-circle text-gray-300";
  };

  // Calculate completion percentages
  const getCategoryCompletion = (category) => {
    const items = checklistData[category];
    const inspectedCount = items.filter(item => 
      inspections[`${category}-${item}`]
    ).length;
    return Math.round((inspectedCount / items.length) * 100);
  };

  const totalItems = Object.values(checklistData).flat().length;
  const completedItems = Object.keys(inspections).filter(key => inspections[key]).length;
  const overallCompletion = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="p-6">
      {/* Header with Progress */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Vehicle Inspection Checklist</h1>
          <div className="text-right">
            <div className="text-lg font-medium">{overallCompletion}% Complete</div>
            <div className="text-sm text-gray-600">{completedItems} of {totalItems} items inspected</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${overallCompletion}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="grid gap-6">
        {Object.entries(checklistData).map(([category, items]) => {
          const completion = getCategoryCompletion(category);
          
          return (
            <Card key={category} className="shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{category}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{completion}% complete</span>
                  <i className={completion === 100 ? "pi pi-check-circle text-green-500" : "pi pi-circle text-gray-300"}></i>
                </div>
              </div>

              <div className="grid gap-3">
                {items.map((item) => {
                  const key = `${category}-${item}`;
                  const isInspected = inspections[key];
                  const itemRemarks = remarks[key];

                  return (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          checked={isInspected}
                          onChange={() => toggleInspection(category, item)}
                          className="mr-2"
                        />
                        <span className={isInspected ? "text-gray-700 line-through" : "text-gray-900"}>
                          {item}
                        </span>
                        {itemRemarks && (
                          <i 
                            className="pi pi-comment text-blue-500 cursor-pointer ml-2"
                            onClick={() => addRemarks(category, item)}
                            title="View remarks"
                          ></i>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          icon="pi pi-comment"
                          className="p-button-text p-button-sm"
                          onClick={() => addRemarks(category, item)}
                          tooltip="Add remarks"
                          tooltipOptions={{ position: 'top' }}
                        />
                        <i className={getStatusIcon(isInspected)} style={{ fontSize: '1.2rem' }}></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Remarks Dialog */}
      <Dialog
        header={currentItem ? `Remarks for ${currentItem.item}` : 'Add Remarks'}
        visible={showRemarksDialog}
        onHide={() => setShowRemarksDialog(false)}
        className="w-96"
      >
        <div className="p-fluid">
          <InputTextarea
            value={currentItem ? remarks[currentItem.key] || "" : ""}
            onChange={(e) => {
              if (currentItem) {
                setRemarks(prev => ({
                  ...prev,
                  [currentItem.key]: e.target.value
                }));
              }
            }}
            rows={4}
            placeholder="Enter your remarks here..."
            className="w-full"
          />
          <div className="flex gap-2 mt-4">
            <Button
              label="Save"
              icon="pi pi-check"
              className="bg-purple-600 border-none"
              onClick={saveRemarks}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setShowRemarksDialog(false)}
            />
          </div>
        </div>
      </Dialog>

      {/* Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button
          label="Submit Inspection"
          icon="pi pi-check"
          className="bg-green-600 border-none"
          disabled={overallCompletion < 100}
          tooltip={overallCompletion < 100 ? "Complete all items to submit" : "Submit inspection"}
        />
        <Button
          label="Save Draft"
          icon="pi pi-save"
          className="bg-blue-600 border-none"
        />
      </div>
    </div>
  );
}