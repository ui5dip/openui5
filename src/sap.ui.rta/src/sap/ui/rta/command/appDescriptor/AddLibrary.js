/*!
 * ${copyright}
 */
sap.ui.define(['sap/ui/rta/command/appDescriptor/AppDescriptorCommand',
				'sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory',
				'sap/ui/fl/descriptorRelated/api/DescriptorChangeFactory'],
	function(AppDescriptorCommand,
		DescriptorInlineChangeFactory,
		DescriptorChangeFactory) {
	"use strict";

	/**
	 * Implementation of a command for Add Library change on App Descriptor
	 *
	 * @class
	 * @extends sap.ui.rta.command.appDescriptor.AppDescriptorCommand
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @private
	 * @since 1.49
	 * @alias sap.ui.rta.command.appDescriptor.AddLibrary
	 * @experimental Since 1.49. This class is experimental and provides only limited functionality. Also the API might be
	 *               changed in future.
	 */
	var AddLibrary = AppDescriptorCommand.extend("sap.ui.rta.command.appDescriptor.AddLibrary", {
		metadata : {
			library : "sap.ui.rta",
			properties : {
				/**
				 * The libraries to be added to the app descriptor
				 * @type object
				 *
				 * "libraries": {
				 *	    "my.new.library": {
				 *	        "minVersion": "1.44",
				 *	        "lazy": "false"
				 *	    },
				 *	    "my.2nd.new.library": {
				 *	        "minVersion": "1.44",
				 *	        "lazy": "true"
				 *	    }
				 *	}
				 *
				 */
				requiredLibraries : {
					type : "object"
				},
				layer : {
					type : "string"
				}
			},
			events : {}
		}
	});

	/**
	 * Prepare the change for the app descriptor
	 *
	 * @param  {object} mFlexSettings - map of Flex Settings including the layer
	 */
	AddLibrary.prototype.prepare = function(mFlexSettings){
		this.setLayer(mFlexSettings.layer);
	};

	/**
	 * Create and submit the change for the app descriptor
	 * @return {Promise} resolving after all changes have been submitted
	 */
	AddLibrary.prototype.submit = function(){
		var mParameters = {};
		mParameters.libraries = this.getRequiredLibraries();

		return DescriptorInlineChangeFactory.create_ui5_addLibraries(mParameters)
			.then(function(oAddLibraryInlineChange){
				return new DescriptorChangeFactory().createNew(this.getReference(),
					oAddLibraryInlineChange, this.getLayer());
			}.bind(this))
			.then(function(oPreparedChange){
				oPreparedChange.submit();
			})
			.catch(function(oError){
				//TODO: Error handling
			});
	};

	return AddLibrary;

}, /* bExport= */true);