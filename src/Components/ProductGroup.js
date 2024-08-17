import React, { useState } from 'react';
import '../StyleSheet/StyleSheet.css';

function ProductDiscountManager() {
	// State to hold the product versions
	const [productVersions, setProductVersions] = useState([
		{
			versionDetails: {
				productGroups: [
					{
						productName: '',
						unitOfMeasure: 'item',
						discountDetails: {
							discountType: 'pricePoint',
							amount: '',
							upto: '',
							itemLimit: '',
							perLbLimit: '',
							isAmountDisabled: false,
							isUptoDisabled: true,
							isItemLimitDisabled: false,
							isPerLbLimitDisabled: true,
						},
					},
				],
			},
			showCopyOption: false,
		},
	]);

	// Options for discount types
	const discountOptions = [
		{ value: 'centsOff', label: 'Cents Off' },
		{ value: 'centsOffPerLb', label: 'Cents Off (per Lb)' },
		{ value: 'free', label: 'Free' },
		{ value: 'pricePoint', label: 'Price Point (items)' },
		{ value: 'pricePointPerLb', label: 'Price Point (per Lb)' },
		{ value: 'percentOff', label: 'Percent Off' },
	];

	// Handle input changes for product details and discounts
	const handleInputChange = (versionIndex, groupIndex, e) => {
		const { name, value } = e.target;
		const updatedVersions = [...productVersions];
		const currentGroup = updatedVersions[versionIndex].versionDetails.productGroups[groupIndex];

		if (name in currentGroup) {
			currentGroup[name] = value;
		} else if (name in currentGroup.discountDetails) {
			currentGroup.discountDetails[name] = value;
		}

		if (name === 'discountType') {
			updateDiscountOptions(currentGroup, value);
		}

		setProductVersions(updatedVersions);
	};

	// Update the discount options based on the selected discount type
	const updateDiscountOptions = (group, discountType) => {
		const { discountDetails } = group;

		const defaultState = {
			isAmountDisabled: true,
			isUptoDisabled: true,
			isItemLimitDisabled: true,
			isPerLbLimitDisabled: true,
		};

		switch (discountType) {
			case 'free':
				Object.assign(discountDetails, defaultState, {
					isAmountDisabled: true,
					isUptoDisabled: true,
					isItemLimitDisabled: false,
					isPerLbLimitDisabled: true,
				});
				break;
			case 'centsOff':
			case 'pricePoint':
				Object.assign(discountDetails, defaultState, {
					isAmountDisabled: false,
					isUptoDisabled: true,
					isItemLimitDisabled: false,
					isPerLbLimitDisabled: true,
				});
				break;
			case 'centsOffPerLb':
			case 'pricePointPerLb':
				Object.assign(discountDetails, defaultState, {
					isAmountDisabled: false,
					isUptoDisabled: true,
					isItemLimitDisabled: false,
					isPerLbLimitDisabled: false,
				});
				break;
			case 'percentOff':
				Object.assign(discountDetails, defaultState, {
					isAmountDisabled: false,
					isUptoDisabled: false,
					isItemLimitDisabled: false,
					isPerLbLimitDisabled: true,
				});
				break;
			default:
				Object.assign(discountDetails, defaultState);
		}
	};

	// Add a new product group to a version
	const addProductGroup = (versionIndex) => {
		const updatedVersions = [...productVersions];
		updatedVersions[versionIndex].versionDetails.productGroups.push({
			productName: '',
			unitOfMeasure: 'item',
			discountDetails: {
				discountType: 'pricePoint',
				amount: '',
				upto: '',
				itemLimit: '',
				perLbLimit: '',
				isAmountDisabled: false,
				isUptoDisabled: true,
				isItemLimitDisabled: false,
				isPerLbLimitDisabled: true,
			},
		});
		setProductVersions(updatedVersions);
	};

	// Remove a product group from a version
	const removeProductGroup = (versionIndex, groupIndex) => {
		const updatedVersions = [...productVersions];
		if (updatedVersions[versionIndex].versionDetails.productGroups.length > 1) {
			updatedVersions[versionIndex].versionDetails.productGroups.splice(groupIndex, 1);
			setProductVersions(updatedVersions);
		}
	};

	// Add a new product version
	const addProductVersion = () => {
		setProductVersions([
			...productVersions,
			{
				versionDetails: {
					productGroups: [
						{
							productName: '',
							unitOfMeasure: 'item',
							discountDetails: {
								discountType: 'pricePoint',
								amount: '',
								uptp: '',
								itemLimit: '',
								perLbLimit: '',
								isAmountDisabled: true,
								isUpToDisabled: true,
								isItemLimitDisabled: true,
								isPerLbLimitDisabled: true,
							},
						},
					],
				},
				showCopyOption: true,
			},
		]);
	};

	// Copy the previous version to the current one
	const copyPreviousVersion = (versionIndex) => {
		if (versionIndex === 0) return; // Skip copying for the first version

		const updatedVersions = [...productVersions];
		const previousVersion = updatedVersions[versionIndex - 1];
		const currentVersion = updatedVersions[versionIndex];

		currentVersion.versionDetails.productGroups = previousVersion.versionDetails.productGroups.map(
			(group) => ({
				...group,
				discountDetails: { ...group.discountDetails },
			})
		);

		setProductVersions(updatedVersions);
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		const formattedData = productVersions.map((version) => ({
			versionDetails: {
				productGroups: version.versionDetails.productGroups.map((group) => ({
					productName: group.productName,
					unitOfMeasure: group.unitOfMeasure,
					discountDetails: {
						discountType: group.discountDetails.discountType,
						amount: group.discountDetails.amount,
						upto: group.discountDetails.upto,
						itemLimit: group.discountDetails.itemLimit,
						perLbLimit: group.discountDetails.perLbLimit,
					},
				})),
			},
		}));

		console.log(JSON.stringify(formattedData, null, 2));
	};

	return (
		<div className="container">
			{/* Form submission handler */}
			<form onSubmit={handleSubmit}>
				<div className='m-2'>
					{/* Iterate over each product version */}
					{productVersions.map((version, versionIndex) => (
						<div key={versionIndex} className='border border-1 border-secondary'>
							{/* Conditionally show the copy option if available */}
							{version.showCopyOption && (
								<div className='d-flex justify-content-end p-2'>
									<a
										href='#!'
										className='link'
										role="button"
										onClick={() => copyPreviousVersion(versionIndex)}
									>
										{/* Button to copy the previous version's details */}
										Copy Previous Version <i className="bi bi-copy"></i>
									</a>
								</div>
							)}
							<div className='d-flex flex-row justify-content-start mt-2 mx-2'>
								<div className='col-6 pt-3 buy-container'>
									<h4 className='col-3'>Buy This...</h4> {/* Label for the "Buy This" section */}
								</div>
								<div className='col-6 pt-3 get-container'>
									<h4 className='col-3'>Get This...</h4> {/* Label for the "Get This" section */}
								</div>
							</div>
							{/* Iterate over each product group in the current version */}
							{version.versionDetails.productGroups.map((group, groupIndex) => (
								<div key={groupIndex} className='d-flex justify-content-between px-2'>
									<div className='col-6 p-4 buy-container'>
										<div className='col-12'>
											<div className='d-flex flex-row justify-content-between'>
												{/* Input field for the product name */}
												<div className='col-9'>
													<div className='col-1'>
														<label htmlFor={`product-${versionIndex}-${groupIndex}`}>Product</label>
													</div>
													<input
														className="col-12"
														id={`product-${versionIndex}-${groupIndex}`}
														type="text"
														name='productName'
														value={group.productName}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
												{/* Disabled input for unit of measure (UoM) */}
												<div className='col-2'>
													<div className='col-1'>
														<label htmlFor={`uom-${versionIndex}-${groupIndex}`}>UoM</label>
													</div>
													<input
														className="col-12"
														id={`uom-${versionIndex}-${groupIndex}`}
														type="text"
														name='unitOfMeasure'
														disabled
														value={group.unitOfMeasure}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className='col-6 p-4 get-container'>
										<div className='d-flex'>
											{/* Dropdown to select discount type */}
											<div className='col-3'>
												<div className='col-1'>
													<label htmlFor={`discount-${versionIndex}-${groupIndex}`}>Discount</label>
												</div>
												<select
													id={`discount-${versionIndex}-${groupIndex}`}
													className="col-12"
													name='discountType'
													value={group.discountDetails.discountType}
													onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
												>
													{/* Options for discount types */}
													{discountOptions.map((option, keyIndex) => (
														<option key={keyIndex} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</div>
											{/* Conditional input for amount if not disabled */}
											{!group.discountDetails.isAmountDisabled && (
												<div className='col-2'>
													<label htmlFor={`amount-${versionIndex}-${groupIndex}`}>Amount</label>
													<input
														className="col-8"
														id={`amount-${versionIndex}-${groupIndex}`}
														type="number"
														name='amount'
														value={group.discountDetails.amount}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
											)}
											{/* Conditional input for "Up To" value if not disabled */}
											{!group.discountDetails.isUptoDisabled && (
												<div className='col-2'>
													<label htmlFor={`upto-${versionIndex}-${groupIndex}`}>UpTo</label>
													<input
														className="col-8"
														id={`upto-${versionIndex}-${groupIndex}`}
														type="number"
														name='upto'
														value={group.discountDetails.upto}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
											)}
											{/* Conditional input for item limit if not disabled */}
											{!group.discountDetails.isItemLimitDisabled && (
												<div className='col-2'>
													<label htmlFor={`itemLimit-${versionIndex}-${groupIndex}`}>Item Limit</label>
													<input
														className="col-8"
														id={`itemLimit-${versionIndex}-${groupIndex}`}
														type="number"
														name='itemLimit'
														value={group.discountDetails.itemLimit}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
											)}
											{/* Conditional input for per pound limit if not disabled */}
											{!group.discountDetails.isPerLbLimitDisabled && (
												<div className='col-3'>
													<label htmlFor={`perLbLimit-${versionIndex}-${groupIndex}`}>Per Lb Limit</label>
													<input
														className="col-8"
														id={`perLbLimit-${versionIndex}-${groupIndex}`}
														type="number"
														name='perLbLimit'
														value={group.discountDetails.perLbLimit}
														onChange={(e) => handleInputChange(versionIndex, groupIndex, e)}
													/>
												</div>
											)}
											{/* Remove button for the product group, shown if more than one group exists */}
											{version.versionDetails.productGroups.length > 1 && (
												<div className='pt-4'>
													<i
														className="bi bi-x-circle"
														onClick={() => removeProductGroup(versionIndex, groupIndex)}
													></i>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
							{/* Section for adding a new product group */}
							<div className='d-flex flex-row justify-content-around mx-2 mb-2'>
								<div className='col-6 buy-container p-2'>
								</div>
								<div className='col-6 get-container d-flex justify-content-end'>
									<a
										href='#!'
										className='col-4 p-2 link'
										role="button"
										onClick={() => addProductGroup(versionIndex)}
									>
										{/* Button to add a new product group */}
										Add Product <span><i className="bi bi-plus-circle"></i></span>
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* Form submission button */}
				<div className='d-flex flex-row justify-content-between p-3 mx-2 mt-4'>
					<button
						className="col-2 btn btn-primary"
						type="submit"
					>
						Submit
					</button>
					{/* Button to add a new version */}
					<a
						href='#!'
						role="button"
						className="col-2 link"
						onClick={addProductVersion}
					>
						Add Version <i className="bi bi-plus-circle"></i>
					</a>
				</div>
			</form>
		</div>
	);
}

export default ProductDiscountManager;
