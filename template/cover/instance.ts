/* eslint-disable */
import request from '{{$$.relative("util")}}';

// mock server: '{{$$.joinUrl(config.host, "mock", data.project._id, data.project.url)}}'
const baseUrl = <% if(_.find(config.projects, {id: data.project._id}).baseUrl){ %>{{_.find(config.projects, {id: data.project._id}).baseUrl}}<% } else { %>''<% } %>;

export default request(baseUrl);
