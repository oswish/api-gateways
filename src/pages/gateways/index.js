import { graphql, Link } from "gatsby";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { naiveSlugify } from "../../helpers/slugify";

const GatewayIndexPage = ({ data }) => {
  const gateways = data.allYaml.edges;

  return (
    <Layout data={data}>
      <h1>API Gateways</h1>
      <p>Research collected for the most popular API Gateways.</p>
      <div>
        <h2>Overview</h2>
        <p>
          The first wave of API Gateways, historically, were offered as a
          component within larger API Management platforms. As the industry
          evolved, a new wave of API Gateways were introduced to provide
          solutions to a changing landscape. Some of these gateway providers are
          now supplementing their standalone offering with additional tools,
          often centered around a management approach more conducive to internal
          API lifecycles.
        </p>
        <div>
          <p>
            Presented here is a comprehensive, yet not entirely exhaustive, list
            of popular API Gateways in use today. A few areas of research have
            been highlighted:
          </p>
          <ul>
            <li>
              <Link to="/platform-capabilities/">Platform Capabilities</Link>
            </li>
            <li>
              <Link to="/gateway-capabilities/">Gateway Capabilities</Link>
            </li>
            <li>
              <Link to="/delivery-models/">Delivery Models</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Why use an API Gateway?</h2>
        <p>
          API Gateways are often a means of centralizing control between API
          Producers and Consumers. This can take a few different shapes:
        </p>
        <ul>
          <li>
            Creating a façade pattern to present a RESTful API in front of
            legacy services.
          </li>
          <li>Enforcing authentication and authorization.</li>
          <li>Rate limiting traffic.</li>
          <li>
            Routing to static or dynamic targets (e.g., phased rollouts, canary
            deployments).
          </li>
        </ul>
      </div>
      <div>
        <h2>Real-world API Gateway deployments</h2>
        <p>
          While many API Gateways are looking to cover both the external and
          internal use cases associated with APIs, it's often common these days
          to see multiple gateways deployed inside a single environment.
        </p>
        <p>
          Typically, this may take the form of a first-wave gateway platform
          such as <Link to="/gateways/apigee-edge">Apigee Edge</Link> for
          external APIs and more lightweight alternatives, such as{" "}
          <Link to="/gateways/kong/">Kong</Link>, for internal use cases.
        </p>
        <p>
          This multi-gateway reality is becoming a new normal for API
          practitioners today.
        </p>
      </div>
      <div>
        <h2>Popular API Gateways</h2>
        <div>
          {gateways.map(({ node: { parent, properties, links } }) => {
            /*const logo = links.find((link) => {
              return link.rel.indexOf("urn:gateway:logo") !== -1;
            }) || { href: "" };*/
            const product = links.find((link) => {
              return link.rel.indexOf("urn:gateway:product") !== -1;
            }) || { href: "" };

            return (
              <div
                className="card"
                key={`gateway-${properties.name}`}
                style={{ marginBottom: "20px", borderRadius: "8px" }}
              >
                <div className="card-body">
                  <h3 className="card-title">{properties.name}</h3>
                  <Link
                    to={`/gateways/${parent.name}/`}
                    className="card-link"
                    style={{
                      height: "auto",
                      fontWeight: "bold",
                    }}
                  ></Link>
                  <div
                    style={{
                      border: "0px solid #000",
                      marginTop: "20px",
                      marginBottom: "30px",
                    }}
                  >
                    {/*<div className="row" style={{ border: "0px solid #000" }}>
                      <div className="col-sm">
                        <Link to={`/gateways/${parent.name}/`}></Link>
                      </div>
                      <img
                        src={logo.href}
                        alt={`${properties.name} Logo`}
                        width="100"
                        style={{ marginBottom: "10px" }}
                      />
                    </div>*/}
                    <div
                      style={{ marginTop: "0px", marginBottom: "30px" }}
                      className="card-text"
                    >
                      <h4>Platform Capabilities</h4>
                      {properties.platformCapabilities.map((capability) => {
                        return (
                          <Link
                            className="tag"
                            to={`/platform-capabilities/${naiveSlugify(
                              capability
                            )}/`}
                          >
                            {capability}
                          </Link>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                      <h4>Gateway Capabilities</h4>
                      {properties.gatewayCapabilities.map((capability) => {
                        return (
                          <Link
                            className="tag"
                            to={`/gateway-capabilities/${naiveSlugify(
                              capability
                            )}/`}
                          >
                            {capability}
                          </Link>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                      <h4>Delivery Models</h4>
                      {properties.deliveryModels.map((model) => {
                        return (
                          <Link
                            className="tag"
                            to={`/delivery-models/${naiveSlugify(model)}/`}
                          >
                            {model}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <Link
                    to={`/gateways/${parent.name}/`}
                    className="card-link"
                    style={{
                      height: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Go to {properties.name} -&gt;
                  </Link>
                  <a
                    href={product.href}
                    className="card-link"
                    style={{
                      height: "auto",
                      marginLeft: "30px",
                    }}
                    target="_blank"
                  >
                    Product Page
                    <FontAwesomeIcon
                      style={{ marginLeft: "10px" }}
                      icon={faExternalLinkAlt}
                      size="1x"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GatewayIndexPage;
export const query = graphql`
  query GatewayIndexPage {
    site {
      siteMetadata {
        description
      }
    }
    allYaml(
      filter: { class: { in: ["gateway"] } }
      sort: { order: ASC, fields: properties___name }
    ) {
      edges {
        node {
          parent {
            ... on File {
              name
            }
          }
          properties {
            name
            description
            provider
            platformCapabilities
            gatewayCapabilities
            deliveryModels
          }
          links {
            rel
            title
            href
          }
        }
      }
    }
  }
`;
