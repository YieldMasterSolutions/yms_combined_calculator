      {/* Seeding Information Card */}
      <div className="grid grid-cols-2 gap-6 bg-zinc-900 border rounded-md p-6">
        <div>
          <p className="text-yellow-400 font-bold">
            Total Number of Seeds to be Treated
          </p>
          <p>{formatNumber(seedTreatmentResults[0].totalSeeds || 0)}</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">
            Total Weight of Seeds to be Treated
          </p>
          <p>{formatNumber(seedTreatmentResults[0].totalSeedWeight || 0)} lbs</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">
            Number of Seeds per Unit
          </p>
          <p>{formatNumber(seedTreatmentResults[0].seedsPerUnit || 0)}</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">
            Total Number of Units to be Treated
          </p>
          <p>{formatNumber(seedTreatmentResults[0].totalUnits || 0)}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-yellow-400">
        Seed Treatment Costs
      </h2>

      {seedTreatmentResults.map((product, idx) => (
        <div
          key={idx}
          className="bg-zinc-900 border rounded-md p-6 grid grid-cols-2 gap-6"
        >
          <h3 className="col-span-2 text-yellow-400 font-bold text-lg">
            {product.productName}
          </h3>
          <div>
            <p className="text-yellow-400 font-bold">Application Rate</p>
            <p>{formatDecimal(product.applicationRate || 0)} oz per unit of seed</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Total Amount of Product Needed</p>
            <p>{formatDecimal(product.totalProductNeeded || 0)} oz</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Total Number of Product Packages</p>
            <p>{product.packagesNeeded} {product.productPackageString.split(" - ")[1]}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Product Cost per Package</p>
            <p>{formatCurrency(product.originalTotalCostToGrower / product.packagesNeeded)}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Total Cost to the Grower</p>
            <p>{formatCurrency(product.originalTotalCostToGrower)}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Product Cost per Ounce</p>
            <p>{formatCurrency(product.costPerUnit || 0)}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
            <p>{formatCurrency(product.discountedTotalCostToGrower)}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">
              Product Cost per Unit of Treated Seed
            </p>
            <p>{formatCurrency(product.costPerUnitOfSeed || 0)}</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Product Cost per Acre</p>
            <p>{formatCurrency(product.individualCostPerAcre)}</p>
          </div>
        </div>
      ))}
    </>
  )}

  {/* In-Furrow/Foliar */}
  <h2 className="text-2xl font-bold text-yellow-400">Individual Product Costs</h2>
  <div className="space-y-6">
    {inFurrowFoliarResults.map((product, idx) => (
      <div
        key={idx}
        className="bg-zinc-900 border rounded-md p-6 grid grid-cols-2 gap-6"
      >
        <h3 className="col-span-2 text-yellow-400 font-bold text-lg">
          {product.productName}
        </h3>
        <div>
          <p className="text-yellow-400 font-bold">Total Product Units to Order</p>
          <p>{product.packagesNeeded} – {product.productPackageString}</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
          <p>{formatCurrency(product.originalTotalCostToGrower)}</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
          <p>{formatCurrency(product.discountedTotalCostToGrower)}</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">
            Individual Cost of Product per Acre
          </p>
          <p>{formatCurrency(product.individualCostPerAcre)}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Summary Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-zinc-900 border rounded-md p-6">
      <h3 className="text-yellow-400 font-bold text-lg">
        Total YMS Biological Program Cost
      </h3>
      <p>
        <span className="font-semibold">Undiscounted Total Cost</span> ={" "}
        {formatCurrency(totalUndiscountedCost)}
      </p>
      <p>
        <span className="font-semibold">Total Discounted Total Cost</span> ={" "}
        {formatCurrency(totalDiscountedCost)}
      </p>
      <p>
        <span className="font-semibold">Total Program Cost per Acre</span> ={" "}
        {formatCurrency(totalCostPerAcre)}
      </p>
    </div>

    <div className="bg-zinc-900 border rounded-md p-6">
      <h3 className="text-yellow-400 font-bold text-lg">Breakeven ROI Calculation</h3>
      <p>Breakeven Yield per Acre = {formatDecimal(breakevenYield || 0)} {cropPriceUnit}/acre</p>
      <p>ROI Yield for 2:1 Investment = {formatDecimal(roi2 || 0)} {cropPriceUnit}/acre</p>
      <p>ROI Yield for 3:1 Investment = {formatDecimal(roi3 || 0)} {cropPriceUnit}/acre</p>
      <p>ROI Yield for 4:1 Investment = {formatDecimal(roi4 || 0)} {cropPriceUnit}/acre</p>
      <p>ROI Yield for 5:1 Investment = {formatDecimal(roi5 || 0)} {cropPriceUnit}/acre</p>
    </div>
  </div>
</div>
